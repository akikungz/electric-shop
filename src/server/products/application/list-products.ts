import type { ProductRepository } from "./product-repository";

export class ListProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute() {
    return this.repository.findAll();
  }
}
