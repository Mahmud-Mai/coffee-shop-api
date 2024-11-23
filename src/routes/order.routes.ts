import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  listOrders,
  getOrderDetails,
  adminListOrders,
  adminUpdateOrderStatus
} from "../controllers/order.ctrl";

const router = express.Router();

// User endpoints
router.get("/orders", authenticate, listOrders);
router.get("/orders/:id", authenticate, getOrderDetails);

// Admin endpoints
router.get("/admin/orders", authenticate, authorize("admin"), adminListOrders);
router.put(
  "/admin/orders/:id",

  authenticate,
  authorize("admin"),
  adminUpdateOrderStatus
);

export default router;
