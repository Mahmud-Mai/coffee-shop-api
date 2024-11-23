import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getAllCoffees,
  getCoffeeById,
  addCoffee,
  updateCoffee,
  deleteCoffee
} from "../services/db.service";
import { Coffee } from "../models/coffee.model";

export const listCoffees = (req: Request, res: string | any) => {
  const coffees = getAllCoffees();
  res.status(200).json(coffees);
};

export const getCoffee = (req: Request, res: string | any) => {
  const { id } = req.params;
  const coffee = getCoffeeById(id);

  if (!coffee) {
    return res.status(404).json({ message: "Coffee not found." });
  }

  res.status(200).json(coffee);
};

export const addCoffeeProduct = (req: Request, res: string | any) => {
  const { name, description, price, imageUrl } = req.body;

  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newCoffee: Coffee = {
    id: uuidv4(),
    name,
    description,
    price,
    imageUrl
  };
  addCoffee(newCoffee);

  res.status(201).json(newCoffee);
};

export const updateCoffeeProduct = (req: Request, res: string | any) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedCoffee = updateCoffee(id, updatedData);

  if (!updatedCoffee) {
    return res.status(404).json({ message: "Coffee not found." });
  }

  res.status(200).json(updatedCoffee);
};

export const deleteCoffeeProduct = (req: Request, res: string | any) => {
  const { id } = req.params;

  const success = deleteCoffee(id);

  if (!success) {
    return res.status(404).json({ message: "Coffee not found." });
  }

  res.status(200).json({ message: "Coffee product deleted successfully." });
};
