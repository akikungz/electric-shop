import { GetProductByIdUseCase } from "@/server/products/application/get-product-by-id";
import { SqliteProductRepository } from "@/server/products/infrastructure/sqlite-product-repository";
import { fail, ok } from "@/server/shared/http";

export const runtime = "nodejs";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const useCase = new GetProductByIdUseCase(new SqliteProductRepository());
  const product = useCase.execute(id);

  if (!product) {
    return fail("Product not found", 404);
  }

  return ok(product);
}
