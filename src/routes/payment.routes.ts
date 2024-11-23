import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { initiatePayment, verifyPayment } from "../controllers/payment.ctrl";

const router = express.Router();

// Payment endpoints
router.post(
  "/payments/initiate",
  // authenticate,
  initiatePayment
);
router.post(
  "/payments/verify",
  // authenticate,
  verifyPayment
);

export default router;
