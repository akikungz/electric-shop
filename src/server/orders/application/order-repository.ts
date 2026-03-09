import type {
  CreateOrderInput,
  OrderEntity,
  OrderItemEntity,
} from "../domain/order";

export interface OrderRepository {
  create(input: CreateOrderInput): OrderEntity;
  findById(id: string): (OrderEntity & { items: OrderItemEntity[] }) | null;
  findByUserId(
    userId: string,
  ): Array<OrderEntity & { items: OrderItemEntity[] }>;
  updatePaymentStatus(
    id: string,
    status: "success" | "failed",
  ): (OrderEntity & { items: OrderItemEntity[] }) | null;
}
