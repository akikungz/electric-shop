import type { Address, Order, OrderItem, PaymentMethod } from "@/types/domain";

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  paymentMethod: PaymentMethod;
  contactPhone: string;
  deliveryAddress: Address;
}

export interface OrderEntity extends Order {
  contactPhone: string;
}

export type OrderItemEntity = OrderItem;
