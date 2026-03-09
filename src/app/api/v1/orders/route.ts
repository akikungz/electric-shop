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
    const useCase = new CreateOrderUseCase(new SqliteOrderRepository());
    const order = useCase.execute(body);
    return ok(order, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cannot create order";
    return fail(message, 400);
  }
}
