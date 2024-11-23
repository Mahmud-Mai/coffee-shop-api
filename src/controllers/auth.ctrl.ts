import { Request } from "express";
import bcrypt from "bcryptjs";
import {
  findUserByUsername,
  addUser,
  getAllUsers
} from "../services/db.service";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../utils/validators.utils";

export const AllUsers = (req: Request, res: string | any) => {
  const AllUsers = getAllUsers();
  res.status(200).json(AllUsers);
};

export const register = async (req: Request, res: string | any) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  if (findUserByUsername(username)) {
    return res.status(400).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    role: role ? role : "user"
  };

  addUser(newUser);

  return res.status(201).json({ message: "User registered successfully." });
};

export const login = async (req: Request, res: string | any) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = generateToken(user.id);
  return res.status(200).json({ token });
};

export const logout = (req: Request, res: string | any) => {
  return res.status(200).json({ message: "Logged out successfully." });
};
