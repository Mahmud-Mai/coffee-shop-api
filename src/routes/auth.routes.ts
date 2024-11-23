import express from "express";
import { AllUsers, login, logout, register } from "../controllers/auth.ctrl";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authenticate, AllUsers);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
