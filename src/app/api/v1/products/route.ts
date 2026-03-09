import { ListProductsUseCase } from "@/server/products/application/list-products";
import { SqliteProductRepository } from "@/server/products/infrastructure/sqlite-product-repository";
import { ok } from "@/server/shared/http";

export const runtime = "nodejs";

export async function GET() {
  const useCase = new ListProductsUseCase(new SqliteProductRepository());
  return ok(useCase.execute());
}
