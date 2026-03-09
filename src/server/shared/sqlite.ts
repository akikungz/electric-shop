import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { products as seedProducts } from "@/data/products";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "electric-shop.db");

type SQLiteDatabase = DatabaseSync;

declare global {
  // eslint-disable-next-line no-var
  var __electricShopDb__: SQLiteDatabase | undefined;
}

function bootstrapSchema(db: SQLiteDatabase) {
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      stock_qty INTEGER NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      total_amount INTEGER NOT NULL,
      payment_method TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      order_status TEXT NOT NULL,
      delivery_address TEXT NOT NULL,
      contact_phone TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price INTEGER NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(id),
      FOREIGN KEY(product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      address TEXT NOT NULL,
      payment_methods TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
  `);

  const count = db.prepare("SELECT COUNT(*) as count FROM products").get() as {
    count: number;
  };

  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO products (id, name, category, price, stock_qty, image, description)
      VALUES (@id, @name, @category, @price, @stockQty, @image, @description)
    `);

    db.exec("BEGIN");
    try {
      for (const item of seedProducts) {
        insert.run({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          stockQty: item.stockQty,
          image: item.image,
          description: item.description,
        });
      }
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }
}

export function getDb() {
  if (globalThis.__electricShopDb__) {
    return globalThis.__electricShopDb__;
  }

  fs.mkdirSync(DB_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  bootstrapSchema(db);
  globalThis.__electricShopDb__ = db;
  return db;
}
