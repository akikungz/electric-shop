import type { CreateOrderInput } from "../domain/order";
import type { OrderRepository } from "./order-repository";

export class CreateOrderUseCase {
  constructor(private readonly repository: OrderRepository) {}

  execute(input: CreateOrderInput) {
    if (!input.items.length) {
      throw new Error("Order must include at least one item.");
    }

    for (const item of input.items) {
      if (item.quantity <= 0) {
        throw new Error("Item quantity must be greater than zero.");
      }
    }

    return this.repository.create(input);
  }
}
