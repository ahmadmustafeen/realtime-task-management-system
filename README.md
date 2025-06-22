# Real-Time Task Manager – Frontend (Next.js)

This is the frontend for the Real-Time Task Management System built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It supports user login, task creation & updates, and real-time UI updates via WebSocket.

## 📦 Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Context API
- Axios for API calls
- Socket.IO client

## 🔧 Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/task-frontend.git
cd task-frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure Environment:**

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Login & Use:**

Use the app at [http://localhost:3001](http://localhost:3001) (or your specified port)

## 🧠 Features

- 🔐 JWT Authentication (stored in `localStorage`)
- 🧠 Role-based access (User/Admin)
- ⚡ Real-time task updates with WebSockets
- 🧾 Form validation with `react-hook-form`
- ♻️ Context-based state management for Tasks and Users
