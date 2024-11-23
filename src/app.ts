import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import coffeeRoutes from "./routes/coffee.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/", coffeeRoutes);
app.use("/", orderRoutes);
app.use("/", paymentRoutes);

export default app;
