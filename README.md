# Real-Time Task Manager – Backend (NestJS)

This is the backend for the Real-Time Task Management System built with **NestJS**, **TypeORM**, and **PostgreSQL**. It includes user authentication, role-based access, and WebSocket support.

## 📦 Tech Stack

- NestJS (TypeScript)
- TypeORM (PostgreSQL)
- Passport JWT
- Socket.IO (WebSocket gateway)
- RESTful API

## 🛠️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/task-backend.git
cd task-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure Environment:**

Create a `.env` file:

```env
PORT=3000
JWT_SECRET=supersecret
FRONTEND_URL=http://localhost:3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=taskmanager
```

4. **Run the server:**

```bash
npm run start:dev
```

API will be available at [http://localhost:3000](http://localhost:3000)

## 🧠 Features

- 🔐 JWT Auth (Register/Login)
- 👥 Role-Based Access (Admin can delete users)
- 📄 CRUD for Tasks
- 🌐 WebSocket gateway for real-time updates
- 🛡️ Global exception filters and guards
- 🧪 Auto-generated UUIDs for users/tasks

## 📬 API Endpoints

| Method | Route           | Description            |
|--------|------------------|------------------------|
| POST   | /auth/register   | Register new user      |
| POST   | /auth/login      | Login and get JWT      |
| GET    | /tasks           | Get all tasks          |
| POST   | /tasks           | Create task            |
| PUT    | /tasks/:id       | Update task            |
| DELETE | /tasks/:id       | Delete task            |
| GET    | /users           | Admin: list users      |
| DELETE | /users/:id       | Admin: delete user     |

## ✨ WebSocket Events

- `task:create`
- `task:update`
- `task:delete`

## 🧪 Test Users

| Email                   | Password  | Role  |
|------------------------|-----------|-------|
| ahmad+1@example.com     | 12345678  | user  |
| ahmad+admin@example.com | 12345678  | admin |
