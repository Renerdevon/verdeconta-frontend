import { createContext } from "react";

export interface User {
  id: string;
  email: string;
}

export interface AuthContextData {
  user: User | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);
