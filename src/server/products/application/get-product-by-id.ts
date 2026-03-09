import type { ProductRepository } from "./product-repository";

export class GetProductByIdUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(id: string) {
    return this.repository.findById(id);
  }
}
