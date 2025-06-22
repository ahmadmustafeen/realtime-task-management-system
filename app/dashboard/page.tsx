"use client";

import { TaskCard } from "@/components/task/TaskCard";
import { TaskDialog, TaskFormData } from "@/components/task/TaskDialog";
import { Button } from "@/components/ui/button";

const mockTasks = [
  {
    title: "Fix navbar bug",
    description: "Users can't click the mobile menu due to z-index issue.",
    status: "in_progress" as const,
    priority: "high" as const,
    createdBy: "Adeel",
  },
  {
    title: "Add task filter",
    description: "Implement dropdown to filter tasks by status and priority.",
    status: "todo" as const,
    priority: "medium" as const,
    createdBy: "Sara",
  },
  {
    title: "Refactor Auth Context",
    description: "Split auth logic into separate utils and hooks.",
    status: "done" as const,
    priority: "low" as const,
    createdBy: "John",
  },
  {
    title: "Add task filter",
    description: "Implement dropdown to filter tasks by status and priority.",
    status: "todo" as const,
    priority: "medium" as const,
    createdBy: "Sara",
  },
  {
    title: "Refactor Auth Context",
    description: "Split auth logic into separate utils and hooks.",
    status: "done" as const,
    priority: "low" as const,
    createdBy: "John",
  },
  {
    title: "Add task filter",
    description: "Implement dropdown to filter tasks by status and priority.",
    status: "todo" as const,
    priority: "medium" as const,
    createdBy: "Sara",
  },
  {
    title: "Refactor Auth Context",
    description: "Split auth logic into separate utils and hooks.",
    status: "done" as const,
    priority: "low" as const,
    createdBy: "John",
  },
];
function DashboardPage() {
  const handleCreate = (data: TaskFormData) => {
    console.log("Create task →", data);
  };

  return (
    <main className="min-h-screen p-6 dark:bg-background">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">All Tasks</h2>
        <TaskDialog
          mode="create"
          onSubmit={handleCreate}
          trigger={<Button>+ New Task</Button>}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockTasks.map((task, i) => (
          <TaskCard key={i} {...task} />
        ))}
      </div>
    </main>
  );
}

export default DashboardPage;
