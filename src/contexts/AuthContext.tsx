'use client';

import { createContext, ReactNode } from "react";

import { User } from "@/entities/User";

interface IAuthContextValue {
  user: User;
}

interface IAuthProviderProps {
  children: ReactNode;
  user: User;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: IAuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user: {} as any }}>
      {children}
    </AuthContext.Provider>
  )
}
