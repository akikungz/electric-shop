import { AuthService } from "@/server/auth/application/auth-service";
import { getSessionTokenFromRequest } from "@/server/auth/cookie";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { fail, ok } from "@/server/shared/http";
import { getDb } from "@/server/shared/sqlite";
import type { CartItem } from "@/types/domain";

export const runtime = "nodejs";

function isCartItems(body: unknown): body is CartItem[] {
  if (!Array.isArray(body)) {
    return false;
  }

  return body.every((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }
    const value = item as Record<string, unknown>;
    return (
      typeof value.productId === "string" &&
      typeof value.quantity === "number" &&
      Number.isFinite(value.quantity)
    );
  });
}

function getCurrentUserId(request: Request) {
  const auth = new AuthService(new SqliteAuthRepository());
  const token = getSessionTokenFromRequest(request);
  const user = auth.getCurrentUser(token);
  return user?.id ?? null;
}

export async function GET(request: Request) {
  const userId = getCurrentUserId(request);
  if (!userId) {
    return fail("Unauthorized", 401);
  }

  const db = getDb();
  const rows = db
    .prepare(
      `SELECT product_id as productId, quantity
       FROM cart_items
       WHERE user_id = ?`,
    )
    .all(userId) as Array<{ productId: string; quantity: number }>;

  const items: CartItem[] = rows.map((row) => ({
    productId: row.productId,
    quantity: row.quantity,
  }));

  return ok(items);
}

export async function PUT(request: Request) {
  const userId = getCurrentUserId(request);
  if (!userId) {
    return fail("Unauthorized", 401);
  }

  const body = (await request.json()) as unknown;
  if (!isCartItems(body)) {
    return fail("Invalid request body", 400);
  }

  const nextItems = body.filter((item) => item.quantity > 0);
  const db = getDb();

  db.exec("BEGIN");
  try {
    db.prepare(
      `INSERT INTO carts (user_id, updated_at)
       VALUES (?, ?)
       ON CONFLICT(user_id) DO UPDATE SET updated_at = excluded.updated_at`,
    ).run(userId, new Date().toISOString());

    db.prepare("DELETE FROM cart_items WHERE user_id = ?").run(userId);

    const insert = db.prepare(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES (?, ?, ?)`,
    );

    for (const item of nextItems) {
      insert.run(
        userId,
        item.productId,
        Math.max(1, Math.floor(item.quantity)),
      );
    }

    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }

  return ok(nextItems);
}
