import { Payment, PaymentStatus } from "../models/payment.model";
import { Cart } from "../models/cart.model";
import { Coffee } from "../models/coffee.model";
import { Order, OrderStatus } from "../models/order.model";
import { User } from "../models/user.model";

// Mock databases
const users: User[] = [];
const carts: Cart[] = [];
const coffees: Coffee[] = [];
const orders: Order[] = [];
const payments: Payment[] = [];

/**
 * User-related operations
 */
export const getAllUsers = (): User[] => users;
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
 * Coffee-related operations
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
 * Order-related operations
 */

export const getAllOrders = (): Order[] => orders;

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter((order) => order.userId === userId);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find((order) => order.id === id);
};

export const createOrder = (order: Order): Order => {
  orders.push(order);
  return order;
};

export const updateOrderStatus = (
  id: string,
  status: OrderStatus
): Order | undefined => {
  const order = getOrderById(id);
  if (!order) return undefined;

  order.status = status;
  return order;
};

/**
 * Payment-related operations
 */

export const createPayment = (payment: Payment): Payment => {
  payments.push(payment);
  return payment;
};

export const getPaymentByOrderId = (orderId: string): Payment | undefined => {
  return payments.find((payment) => payment.orderId === orderId);
};

export const updatePaymentStatus = (
  id: string,
  status: PaymentStatus
): Payment | undefined => {
  const payment = payments.find((payment) => payment.id === id);
  if (!payment) return undefined;

  payment.status = status;
  return payment;
};

/**
 * Additional helper for testing or debugging
 */
export const resetDatabase = (): void => {
  users.length = 0;
  carts.length = 0;
};
