import type {
  CreateOrderInput,
  OrderEntity,
  OrderItemEntity,
} from "../domain/order";

export interface OrderRepository {
  create(input: CreateOrderInput): OrderEntity;
  findById(id: string): (OrderEntity & { items: OrderItemEntity[] }) | null;
}
