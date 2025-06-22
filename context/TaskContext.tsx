"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api, { API_ROUTES } from "@/lib/api"; // Adjust based on your api setup

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  isActive: boolean;
  isDeleted: boolean;
};

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (task: Partial<Task>) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Partial<Task>) => {
    try {
      const { data } = await api.post(API_ROUTES.TASKS.CREATE, task);
      setTasks((prev) => [...prev, data]);
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  const updateTask = async (task: Partial<Task>) => {
    try {
      const { data } = await api.put(API_ROUTES.TASKS.BY_ID(task.id!), task);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? data : t)));
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, createTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
