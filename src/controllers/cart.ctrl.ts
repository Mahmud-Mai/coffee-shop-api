import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import {
  getCartByUserId,
  createCart,
  updateCart,
  createOrder
} from "../services/db.service";
import { Order, OrderItem } from "../models/order.model";

export const getCart = (req: Request, res: string | any) => {
  const userId = (req as any).user.id;

  let cart = getCartByUserId(userId);
  if (!cart) {
    cart = createCart(userId);
  }

  return res.status(200).json(cart);
};

export const addToCart = (req: Request, res: string | any) => {
  const userId = (req as any).user.id;
  const { productId, quantity, name, price } = req.body;

  if (!name || !price || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  let cart = getCartByUserId(userId);
  if (!cart) {
    cart = createCart(userId);
  }

  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      name,
      price
    });
  }

  updateCart(userId, cart);
  return res.status(200).json(cart);
};

export const removeFromCart = (req: Request, res: string | any) => {
  const userId = (req as any).user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required." });
  }

  const cart = getCartByUserId(userId);
  if (!cart) {
    return res.status(400).json({ message: "User has no Cart." });
  }

  cart.items = cart.items.filter((item) => item.productId !== productId);
  updateCart(userId, cart);

  return res.status(200).json(cart);
};

export const checkout = (req: Request, res: string | any) => {
  const userId = (req as any).user.id;

  const cart = getCartByUserId(userId);
  if (!cart || cart.items.length === 0) {
    return res
      .status(400)
      .json({ message: "Cart is empty. Cannot proceed to checkout." });
  }

  // Create order items from cart items
  const orderItems: OrderItem[] = cart.items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }));

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Create a new order
  const newOrder: Order = {
    id: uuidv4(),
    userId,
    items: orderItems,
    total,
    status: "pending",
    createdAt: new Date()
  };

  createOrder(newOrder);

  // Clear the cart after checkout
  cart.items = [];
  updateCart(userId, cart);

  return res
    .status(200)
    .json({ message: "Checkout successful.", order: newOrder });
};
