import { AuthService } from "@/server/auth/application/auth-service";
import { getSessionTokenFromRequest } from "@/server/auth/cookie";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { CreateOrderUseCase } from "@/server/orders/application/create-order";
import type { CreateOrderInput } from "@/server/orders/domain/order";
import { SqliteOrderRepository } from "@/server/orders/infrastructure/sqlite-order-repository";
import { fail, ok } from "@/server/shared/http";

export const runtime = "nodejs";

function isCreateOrderInput(body: unknown): body is CreateOrderInput {
  if (!body || typeof body !== "object") {
    return false;
  }

  const payload = body as Record<string, unknown>;
  return (
    Array.isArray(payload.items) &&
    typeof payload.paymentMethod === "string" &&
    typeof payload.contactPhone === "string" &&
    typeof payload.deliveryAddress === "object"
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;

  if (!isCreateOrderInput(body)) {
    return fail("Invalid request body", 400);
  }

  try {
    const auth = new AuthService(new SqliteAuthRepository());
    const token = getSessionTokenFromRequest(request);
    const currentUser = auth.getCurrentUser(token);
    if (!currentUser) {
      return fail("Unauthorized", 401);
    }

    const useCase = new CreateOrderUseCase(new SqliteOrderRepository());
    const order = useCase.execute({
      ...body,
      userId: currentUser.id,
    });
    return ok(order, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cannot create order";
    return fail(message, 400);
  }
}

export async function GET(request: Request) {
  try {
    const auth = new AuthService(new SqliteAuthRepository());
    const token = getSessionTokenFromRequest(request);
    const currentUser = auth.getCurrentUser(token);
    if (!currentUser) {
      return fail("Unauthorized", 401);
    }

    const repository = new SqliteOrderRepository();
    const orders = repository.findByUserId(currentUser.id);
    return ok(orders);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cannot list orders";
    return fail(message, 400);
  }
}
