import { randomUUID } from "node:crypto";
import { getDb } from "@/server/shared/sqlite";
import type { OrderRepository } from "../application/order-repository";
import type {
  CreateOrderInput,
  OrderEntity,
  OrderItemEntity,
} from "../domain/order";

interface ProductRow {
  id: string;
  price: number;
  stock_qty: number;
}

export class SqliteOrderRepository implements OrderRepository {
  private readonly db = getDb();

  private mapOrderById(id: string) {
    const orderRow = this.db
      .prepare(
        `SELECT id, total_amount as totalAmount, payment_method as paymentMethod, payment_status as paymentStatus,
                order_status as orderStatus, delivery_address as deliveryAddress, contact_phone as contactPhone,
                created_at as createdAt
         FROM orders
         WHERE id = ?`,
      )
      .get(id) as
      | {
          id: string;
          totalAmount: number;
          paymentMethod: OrderEntity["paymentMethod"];
          paymentStatus: OrderEntity["paymentStatus"];
          orderStatus: OrderEntity["orderStatus"];
          deliveryAddress: string;
          contactPhone: string;
          createdAt: string;
        }
      | undefined;

    if (!orderRow) {
      return null;
    }

    const itemRows = this.db
      .prepare(
        `SELECT product_id as productId, quantity, unit_price as unitPrice FROM order_items WHERE order_id = ?`,
      )
      .all(id);

    const items: OrderItemEntity[] = itemRows.map((row) => {
      const value = row as Record<string, unknown>;

      return {
        productId: String(value.productId),
        quantity: Number(value.quantity),
        unitPrice: Number(value.unitPrice),
      };
    });

    return {
      id: orderRow.id,
      totalAmount: orderRow.totalAmount,
      paymentMethod: orderRow.paymentMethod,
      paymentStatus: orderRow.paymentStatus,
      orderStatus: orderRow.orderStatus,
      deliveryAddress: JSON.parse(
        orderRow.deliveryAddress,
      ) as OrderEntity["deliveryAddress"],
      contactPhone: orderRow.contactPhone,
      createdAt: orderRow.createdAt,
      items,
    };
  }

  create(input: CreateOrderInput): OrderEntity {
    const now = new Date().toISOString();
    const orderId = `ES-${randomUUID()}`;

    let createdOrder: OrderEntity | null = null;
    this.db.exec("BEGIN");
    try {
      let totalAmount = 0;
      const preparedItems: Array<{
        productId: string;
        quantity: number;
        unitPrice: number;
      }> = [];

      for (const item of input.items) {
        const product = this.db
          .prepare("SELECT id, price, stock_qty FROM products WHERE id = ?")
          .get(item.productId) as ProductRow | undefined;

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        if (product.stock_qty < item.quantity) {
          throw new Error(`Insufficient stock for product: ${item.productId}`);
        }

        totalAmount += product.price * item.quantity;
        preparedItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        });
      }

      const paymentStatus: OrderEntity["paymentStatus"] = "pending";
      const orderStatus: OrderEntity["orderStatus"] = "pending";

      this.db
        .prepare(
          `INSERT INTO orders (id, user_id, total_amount, payment_method, payment_status, order_status, delivery_address, contact_phone, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .run(
          orderId,
          input.userId ?? null,
          totalAmount,
          input.paymentMethod,
          paymentStatus,
          orderStatus,
          JSON.stringify(input.deliveryAddress),
          input.contactPhone,
          now,
        );

      const insertItem = this.db.prepare(
        "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
      );
      const decreaseStock = this.db.prepare(
        "UPDATE products SET stock_qty = stock_qty - ? WHERE id = ?",
      );

      for (const item of preparedItems) {
        insertItem.run(orderId, item.productId, item.quantity, item.unitPrice);
        decreaseStock.run(item.quantity, item.productId);
      }

      createdOrder = {
        id: orderId,
        totalAmount,
        paymentMethod: input.paymentMethod,
        paymentStatus,
        orderStatus,
        deliveryAddress: input.deliveryAddress,
        contactPhone: input.contactPhone,
        createdAt: now,
        items: preparedItems,
      };

      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }

    if (!createdOrder) {
      throw new Error("Cannot create order.");
    }

    return createdOrder;
  }

  findById(id: string): (OrderEntity & { items: OrderItemEntity[] }) | null {
    return this.mapOrderById(id);
  }

  findByUserId(userId: string) {
    const rows = this.db
      .prepare(
        `SELECT id
         FROM orders
         WHERE user_id = ?
         ORDER BY datetime(created_at) DESC`,
      )
      .all(userId) as Array<{ id: string }>;

    return rows
      .map((row) => this.mapOrderById(row.id))
      .filter((order): order is OrderEntity & { items: OrderItemEntity[] } =>
        Boolean(order),
      );
  }

  updatePaymentStatus(id: string, status: "success" | "failed") {
    const current = this.db
      .prepare(
        "SELECT payment_status as paymentStatus FROM orders WHERE id = ?",
      )
      .get(id) as { paymentStatus: OrderEntity["paymentStatus"] } | undefined;

    if (!current) {
      return null;
    }

    if (current.paymentStatus === status) {
      return this.mapOrderById(id);
    }

    const paymentStatus: OrderEntity["paymentStatus"] = status;
    const orderStatus: OrderEntity["orderStatus"] =
      status === "success" ? "paid" : "pending";

    if (status === "failed") {
      this.db.exec("BEGIN");
      try {
        const orderItems = this.db
          .prepare(
            "SELECT product_id as productId, quantity FROM order_items WHERE order_id = ?",
          )
          .all(id) as Array<{ productId: string; quantity: number }>;

        const restock = this.db.prepare(
          "UPDATE products SET stock_qty = stock_qty + ? WHERE id = ?",
        );
        for (const item of orderItems) {
          restock.run(item.quantity, item.productId);
        }

        this.db
          .prepare(
            `UPDATE orders
             SET payment_status = ?, order_status = ?
             WHERE id = ?`,
          )
          .run(paymentStatus, orderStatus, id);

        this.db.exec("COMMIT");
      } catch (error) {
        this.db.exec("ROLLBACK");
        throw error;
      }
      return this.mapOrderById(id);
    }

    this.db
      .prepare(
        `UPDATE orders
         SET payment_status = ?, order_status = ?
         WHERE id = ?`,
      )
      .run(paymentStatus, orderStatus, id);

    return this.mapOrderById(id);
  }
}
