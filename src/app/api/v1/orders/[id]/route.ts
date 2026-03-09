import { AuthService } from "@/server/auth/application/auth-service";
import { getSessionTokenFromRequest } from "@/server/auth/cookie";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { SqliteOrderRepository } from "@/server/orders/infrastructure/sqlite-order-repository";
import { fail, ok } from "@/server/shared/http";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const auth = new AuthService(new SqliteAuthRepository());
  const token = getSessionTokenFromRequest(request);
  const currentUser = auth.getCurrentUser(token);

  if (!currentUser) {
    return fail("Unauthorized", 401);
  }

  const repository = new SqliteOrderRepository();
  const ownedOrder = repository
    .findByUserId(currentUser.id)
    .find((order) => order.id === id);

  if (!ownedOrder) {
    return fail("Order not found", 404);
  }

  return ok(ownedOrder);
}
