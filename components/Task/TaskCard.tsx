"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TaskDialog, TaskFormData } from "./TaskDialog";
import { EditIcon } from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { useUsers } from "@/context/UsersContext";

type TaskCardProps = {
  title: string;
  description: string;
  id: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  createdBy: string;
  assignedTo: string;
  createdAt?: string;
};

export function TaskCard({
  title,
  description,
  id,
  status,
  priority,
  createdBy,
  assignedTo,
}: TaskCardProps) {
  const [open, setOpen] = useState(false);
  const { updateTask } = useTasks();
  const { users } = useUsers();

  const statusColors: Record<string, string> = {
    todo: "bg-gray-200 text-gray-800",
    in_progress: "bg-yellow-200 text-yellow-800",
    done: "bg-green-200 text-green-800",
  };

  const priorityColors: Record<string, string> = {
    low: "bg-blue-100 text-blue-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
  };

  const handleEdit = (data: TaskFormData) => {
    if (!id) return;
    updateTask({ id, ...data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="w-full cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setOpen(true)}
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <CardTitle className="text-md font-medium">{title}</CardTitle>
            <Badge className={cn("text-xs", priorityColors[priority])}>
              {priority}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
            <div className="flex items-center justify-between text-xs mt-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="capitalize">
                    {createdBy[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Badge className={cn("capitalize", statusColors[status])}>
                {status.replace("_", " ")}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs mt-4">
              <span className="text-xs text-muted-foreground text-left">
                Created By: {users?.find((u) => u.id === createdBy)?.name}
              </span>
              <span className="text-xs text-muted-foreground text-right">
                Assigned To: {users?.find((u) => u.id === assignedTo)?.name}
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <TaskDialog
            mode="edit"
            initialData={{
              title,
              description,
              status,
              priority,
              createdBy,
              assignedTo,
            }}
            onSubmit={handleEdit}
            trigger={
              <EditIcon className="w-6 h-6 absolute bottom-3 right-3 cursor-pointer" />
            }
          />
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <span className="text-xs font-medium text-muted-foreground">
              Description
            </span>
            <p className="text-sm mt-1">{description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="gap-x-2 flex items-center">
              <span className="text-xs font-medium text-muted-foreground">
                Status
              </span>
              <Badge className={cn("capitalize mt-1", statusColors[status])}>
                {status.replace("_", " ")}
              </Badge>
            </div>
            <div className="gap-x-2 flex items-center">
              <span className="text-xs font-medium text-muted-foreground">
                Priority
              </span>
              <Badge
                className={cn("capitalize mt-1", priorityColors[priority])}
              >
                {priority}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-muted-foreground">
                Created By
              </span>
              <span className="text-xs text-muted-foreground">
                {users?.find((u) => u.id === createdBy)?.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-muted-foreground">
                Assigned To
              </span>
              <span className="text-xs text-muted-foreground">
                {users?.find((u) => u.id === assignedTo)?.name}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
