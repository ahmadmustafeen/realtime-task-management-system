// /lib/constants.ts

// API endpoints (if using axios)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";


// App routes
export const ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/profile",
  USERS: "/admin/users",
};

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

// Task statuses
export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};
