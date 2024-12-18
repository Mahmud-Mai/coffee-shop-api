import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): string | object => {
  return jwt.verify(token, JWT_SECRET);
};
