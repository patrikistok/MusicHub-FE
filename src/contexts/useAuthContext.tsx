import React, { createContext, useEffect, useState } from "react";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
});

type AuthContextProviderType = {
  children: JSX.Element;
};

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    storedUser ? (JSON.parse(storedUser) as User) : null
  );
  const isAuthenticated = !!user;

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
