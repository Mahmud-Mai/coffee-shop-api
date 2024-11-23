import { Cart, CartItem } from "../models/cart.model";
import { User } from "../models/user.model";

// Mock databases
const users: User[] = [];
const carts: Cart[] = [];

/**
 * User-related operations
 */
export const findUserByUsername = (username: string): User | undefined =>
  users.find((user) => user.username === username);

export const addUser = (user: User): void => {
  user.role = user.role || "user";
  users.push(user);
};

/**
 * Cart-related operations
 */
export const getCartByUserId = (userId: string): Cart | undefined => {
  return carts.find((cart) => cart.userId === userId);
};

export const createCart = (userId: string): Cart => {
  const newCart: Cart = { userId, items: [] };
  carts.push(newCart);
  return newCart;
};

export const updateCart = (userId: string, updatedCart: Cart): void => {
  const index = carts.findIndex((cart) => cart.userId === userId);
  if (index !== -1) {
    carts[index] = updatedCart;
  }
};

/**
 * Additional helper for testing or debugging
 */
export const resetDatabase = (): void => {
  users.length = 0;
  carts.length = 0;
};
