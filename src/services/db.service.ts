import { Cart, CartItem } from "../models/cart.model";
import { Coffee } from "../models/coffee.model";
import { User } from "../models/user.model";

// Mock databases
const users: User[] = [];
const carts: Cart[] = [];
const coffees: Coffee[] = [];

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
 * Coffees-related operations
 */
export const getAllCoffees = (): Coffee[] => coffees;

export const getCoffeeById = (id: string): Coffee | undefined => {
  return coffees.find((coffee) => coffee.id === id);
};

export const addCoffee = (coffee: Coffee): Coffee => {
  coffees.push(coffee);
  return coffee;
};

export const updateCoffee = (
  id: string,
  updatedCoffee: Partial<Coffee>
): Coffee | undefined => {
  const coffee = getCoffeeById(id);
  if (!coffee) return undefined;

  Object.assign(coffee, updatedCoffee);
  return coffee;
};

export const deleteCoffee = (id: string): boolean => {
  const index = coffees.findIndex((coffee) => coffee.id === id);
  if (index === -1) return false;

  coffees.splice(index, 1);
  return true;
};

/**
 * Additional helper for testing or debugging
 */
export const resetDatabase = (): void => {
  users.length = 0;
  carts.length = 0;
};
