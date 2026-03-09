import { GetOrderByIdUseCase } from "@/server/orders/application/get-order-by-id";
import { SqliteOrderRepository } from "@/server/orders/infrastructure/sqlite-order-repository";
import { fail, ok } from "@/server/shared/http";

export const runtime = "nodejs";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const useCase = new GetOrderByIdUseCase(new SqliteOrderRepository());
  const order = useCase.execute(id);

  if (!order) {
    return fail("Order not found", 404);
  }

  return ok(order);
}
