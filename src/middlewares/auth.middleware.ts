import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/validators.utils";

export const authenticate = (
  req: Request,
  res: string | any,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🚀 ~ AllUsers ~ userId:", (req as any).user.id);

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

export const authorize = (role: "admin") => {
  return (req: Request, res: string | any, next: NextFunction) => {
    const user = (req as any).user;

    if (user.role !== role) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions." });
    }

    next();
  };
};
