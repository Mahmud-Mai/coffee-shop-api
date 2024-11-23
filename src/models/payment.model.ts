export type PaymentStatus = "pending" | "successful" | "failed";

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
}
