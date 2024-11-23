import { Request, Response } from "express";
import {
  getCartByUserId,
  createCart,
  updateCart
} from "../services/db.service";

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
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required." });
  }

  let cart = getCartByUserId(userId);
  if (!cart) {
    cart = createCart(userId);
  }

  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
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

  // For demo purposes, I'm just clearing the cart and returning a success message
  cart.items = [];
  updateCart(userId, cart);

  return res.status(200).json({ message: "Checkout successful.", cart });
};
