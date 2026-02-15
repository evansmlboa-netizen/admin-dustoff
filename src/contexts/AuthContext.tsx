import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  provider: "email" | "google" | "apple";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("dustoff_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const persistUser = (u: User) => {
    setUser(u);
    localStorage.setItem("dustoff_user", JSON.stringify(u));
  };

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    persistUser({ id: "usr_1", email, name: email.split("@")[0], provider: "email" });
  };

  const signup = async (email: string, _password: string, name: string) => {
    await new Promise((r) => setTimeout(r, 500));
    persistUser({ id: "usr_" + Date.now(), email, name, provider: "email" });
  };

  const loginWithGoogle = async () => {
    await new Promise((r) => setTimeout(r, 500));
    persistUser({ id: "usr_g1", email: "user@gmail.com", name: "Google User", provider: "google" });
  };

  const loginWithApple = async () => {
    await new Promise((r) => setTimeout(r, 500));
    persistUser({ id: "usr_a1", email: "user@icloud.com", name: "Apple User", provider: "apple" });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dustoff_user");
  };

  const forgotPassword = async (_email: string) => {
    await new Promise((r) => setTimeout(r, 500));
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) persistUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, loginWithApple, logout, forgotPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
