"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/lib/api";
import { useAuth } from "./AuthContext";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type UsersContextType = {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  resetUsers: () => void;
  updateUser: (userId: string, updateData: Partial<User>) => Promise<void>;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const {user,setUser} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: string, updateData: Partial<User>) => {
    try {
      const { data } = await api.put(`/users/${userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(user?.id === userId){
        setUser(data);
      }
      setUsers((prev) => prev.map((user) => (user.id === userId ? data : user)));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const resetUsers = () => setUsers([]);

  return (
    <UsersContext.Provider value={{ users, loading, fetchUsers, resetUsers,updateUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
