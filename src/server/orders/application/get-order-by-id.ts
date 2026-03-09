import type { OrderRepository } from "./order-repository";

export class GetOrderByIdUseCase {
  constructor(private readonly repository: OrderRepository) {}

  execute(id: string) {
    return this.repository.findById(id);
  }
}
