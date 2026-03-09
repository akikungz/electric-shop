import { getDb } from "@/server/shared/sqlite";
import type { ProductRepository } from "../application/product-repository";
import type { ProductEntity } from "../domain/product";

export class SqliteProductRepository implements ProductRepository {
  private readonly db = getDb();

  private mapRow(row: Record<string, unknown>): ProductEntity {
    return {
      id: String(row.id),
      name: String(row.name),
      category: String(row.category) as ProductEntity["category"],
      price: Number(row.price),
      stockQty: Number(row.stockQty),
      image: String(row.image),
      description: String(row.description),
    };
  }

  findAll(): ProductEntity[] {
    const rows = this.db
      .prepare(
        `SELECT id, name, category, price, stock_qty as stockQty, image, description FROM products ORDER BY name ASC`,
      )
      .all();

    return rows.map((row) => this.mapRow(row as Record<string, unknown>));
  }

  findById(id: string): ProductEntity | null {
    const row = this.db
      .prepare(
        `SELECT id, name, category, price, stock_qty as stockQty, image, description FROM products WHERE id = ?`,
      )
      .get(id);

    if (!row) {
      return null;
    }

    return this.mapRow(row as Record<string, unknown>);
  }
}
