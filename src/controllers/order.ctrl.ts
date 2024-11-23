import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getAllOrders,
  getOrdersByUserId,
  getOrderById,
  updateOrderStatus
} from "../services/db.service";
import { OrderStatus } from "../models/order.model";

export const listOrders = (req: Request, res: string | any) => {
  const userId = (req as any).user.id;

  const userOrders = getOrdersByUserId(userId);
  res.status(200).json(userOrders);
};

export const getOrderDetails = (req: Request, res: string | any) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  const order = getOrderById(id);

  if (!order || order.userId !== userId) {
    return res
      .status(404)
      .json({ message: "Order not found or access denied." });
  }

  res.status(200).json(order);
};

export const adminListOrders = (req: Request, res: string | any) => {
  const orders = getAllOrders();
  res.status(200).json(orders);
};

export const adminUpdateOrderStatus = (req: Request, res: string | any) => {
  const { id } = req.params;
  const { status }: { status: OrderStatus } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required." });
  }

  const updatedOrder = updateOrderStatus(id, status);

  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found." });
  }

  res.status(200).json(updatedOrder);
};
