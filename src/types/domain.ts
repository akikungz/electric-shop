export type Locale = "en" | "th";

export type Category =
  | "tv"
  | "home-theater"
  | "household-appliances"
  | "it-accessories";

export type PaymentMethod = "credit-card" | "debit-card" | "qr-code" | "cod";

export type OrderStatus =
  | "pending"
  | "paid"
  | "packed"
  | "shipped"
  | "delivered";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  stockQty: number;
  image: string;
  description: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Address {
  line1: string;
  district: string;
  province: string;
  postalCode: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address: Address;
  paymentMethods: PaymentMethod[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "success" | "pending" | "failed";
  deliveryAddress: Address;
  orderStatus: OrderStatus;
  createdAt: string;
}
