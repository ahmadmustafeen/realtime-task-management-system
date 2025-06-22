import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true,
});

// Route paths only (relative paths, no full URLs)
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
  USERS: {
    ALL: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },
  TASKS: {
    ALL: "/tasks",
    CREATE: "/tasks",
    BY_ID: (id: string) => `/tasks/${id}`,
  },
};

export default api;
