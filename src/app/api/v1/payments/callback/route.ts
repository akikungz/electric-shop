import { AuthService } from "@/server/auth/application/auth-service";
import { getSessionTokenFromRequest } from "@/server/auth/cookie";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { SqliteOrderRepository } from "@/server/orders/infrastructure/sqlite-order-repository";
import { fail, ok } from "@/server/shared/http";

export const runtime = "nodejs";

type PaymentCallbackStatus = "success" | "failed";

function isPayload(
  body: unknown,
): body is { orderId: string; status: PaymentCallbackStatus } {
  if (!body || typeof body !== "object") {
    return false;
  }

  const value = body as Record<string, unknown>;
  return (
    typeof value.orderId === "string" &&
    (value.status === "success" || value.status === "failed")
  );
}

export async function POST(request: Request) {
  const token = getSessionTokenFromRequest(request);
  const auth = new AuthService(new SqliteAuthRepository());
  const currentUser = auth.getCurrentUser(token);

  if (!currentUser) {
    return fail("Unauthorized", 401);
  }

  const body = (await request.json()) as unknown;
  if (!isPayload(body)) {
    return fail("Invalid request body", 400);
  }

  const repository = new SqliteOrderRepository();
  const ownedOrder = repository
    .findByUserId(currentUser.id)
    .find((order) => order.id === body.orderId);

  if (!ownedOrder) {
    return fail("Order not found", 404);
  }

  const updated = repository.updatePaymentStatus(body.orderId, body.status);
  if (!updated) {
    return fail("Order not found", 404);
  }

  return ok(updated);
}
