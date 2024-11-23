import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import coffeeRoutes from "./routes/coffee.routes";

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/", coffeeRoutes);

export default app;
