"use client";

import { TaskCard } from "@/components/task/TaskCard";
import { TaskDialog, TaskFormData } from "@/components/task/TaskDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTasks } from "@/context/TaskContext";

function DashboardPage() {
  const { user } = useAuth();
  const { tasks, createTask, loading } = useTasks();

  const handleCreate = (data: TaskFormData) => {
    createTask({ ...data, createdBy: user?.id });
    alert("Task created successfully");
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
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          tasks?.map((task, i) => (
            <TaskCard key={i} {...task} />
          ))
        )}
      </div>
    </main>
  );
}

export default DashboardPage;
