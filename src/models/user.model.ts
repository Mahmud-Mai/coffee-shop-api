export type UserRole = "user" | "admin";

export interface User {
  id: string;
  username: string;
  password: string; // hashed password
  role: UserRole;
}
