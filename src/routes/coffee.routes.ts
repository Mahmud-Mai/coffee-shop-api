import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  listCoffees,
  getCoffee,
  addCoffeeProduct,
  updateCoffeeProduct,
  deleteCoffeeProduct
} from "../controllers/coffee.ctrl";

const router = express.Router();

// Public endpoints
router.get("/coffees", listCoffees);
router.get("/coffees/:id", getCoffee);

// Admin endpoints
router.post(
  "/admin/coffees",
  authenticate,
  authorize("admin"),
  addCoffeeProduct
);
router.put(
  "/admin/coffees/:id",
  authenticate,
  authorize("admin"),
  updateCoffeeProduct
);
router.delete(
  "/admin/coffees/:id",
  authenticate,
  authorize("admin"),
  deleteCoffeeProduct
);

export default router;
