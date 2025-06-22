"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import api, { API_ROUTES } from "../lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface RegisterDetails extends Credentials {
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  register: (details: RegisterDetails) => Promise<void>;
  resetUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: Credentials) => {
    const { data } = await api.post(API_ROUTES.AUTH.LOGIN, credentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem("USER", JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (details: RegisterDetails) => {
    const { data } = await api.post(API_ROUTES.AUTH.REGISTER, details);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("USER", JSON.stringify(data.user));
  };

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      setUser(JSON.parse(localStorage.getItem("USER") || ""));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const resetUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
