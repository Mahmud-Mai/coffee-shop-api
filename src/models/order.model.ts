export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "canceled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}
