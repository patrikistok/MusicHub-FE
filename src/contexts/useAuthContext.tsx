import React, { createContext, useState } from "react";
import { User } from "../types";

type AuthContextType = {
  token: string;
  user: User | null;
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  token: "",
  user: null,
  isAuthenticated: false,
  setToken: () => {},
  setUser: () => {},
});

type AuthContextProviderType = {
  children: JSX.Element;
};

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const [token, setToken] = useState<string>(storedToken || "");
  const [user, setUser] = useState<User | null>(
    storedUser ? (JSON.parse(storedUser) as User) : null
  );
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, setToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
