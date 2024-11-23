import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

export default app;
