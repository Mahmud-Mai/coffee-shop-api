import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createPayment,
  getOrderById,
  getPaymentByOrderId,
  updateOrderStatus,
  updatePaymentStatus
} from "../services/db.service";
import { Payment } from "../models/payment.model";

export const initiatePayment = (req: Request, res: string | any) => {
  const { orderId } = req.body;
  const userId = (req as any).user.id;

  // Check if the order exists and belongs to the user
  const order = getOrderById(orderId);
  if (!order || order.userId !== userId) {
    return res
      .status(404)
      .json({ message: "Order not found or access denied." });
  }

  if (getPaymentByOrderId(orderId)) {
    return res
      .status(400)
      .json({ message: "Payment already initiated for this order." });
  }

  // Create a new payment
  const newPayment: Payment = {
    id: uuidv4(),
    orderId,
    userId,
    amount: order.total,
    status: "pending",
    createdAt: new Date()
  };

  createPayment(newPayment);

  res.status(201).json({
    message: "Payment initiated. Proceed to payment gateway.",
    payment: newPayment
  });
};

export const verifyPayment = (req: Request, res: string | any) => {
  const { orderId, paymentGatewayResponse } = req.body; // Mock response from the gateway
  const userId = (req as any).user.id;

  // Check if the payment exists
  const payment = getPaymentByOrderId(orderId);
  if (!payment || payment.userId !== userId) {
    return res
      .status(404)
      .json({ message: "Payment not found or access denied." });
  }

  if (payment.status !== "pending") {
    return res
      .status(400)
      .json({ message: "Payment has already been processed." });
  }

  // Simulate payment verification
  const paymentSuccess = paymentGatewayResponse?.success === true;

  // Update payment status
  payment.status = paymentSuccess ? "successful" : "failed";
  updatePaymentStatus(payment.id, payment.status);

  // Update order status if payment is successful
  if (paymentSuccess) {
    updateOrderStatus(orderId, "processing");
  }

  res.status(200).json({
    message: paymentSuccess
      ? "Payment verified successfully."
      : "Payment verification failed.",
    payment
  });
};
