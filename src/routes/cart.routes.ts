import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  checkout
} from "../controllers/cart.ctrl";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(authenticate);

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/checkout", checkout);

export default router;
