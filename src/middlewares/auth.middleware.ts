import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/validators.utils";

export const authenticate = (
  req: Request,
  res: string | any,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};