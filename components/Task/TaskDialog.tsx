"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useUsers } from "../../context/UsersContext";

const taskSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in_progress", "done"]),
  assignedTo: z.string().min(2),
});

export type TaskFormData = z.infer<typeof taskSchema>;

type TaskDialogProps = {
  mode: "create" | "edit";
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  trigger: React.ReactNode;
};

export function TaskDialog({
  mode,
  initialData,
  onSubmit,
  trigger,
}: TaskDialogProps) {
  const [open, setOpen] = useState(false);
  const { users } = useUsers();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      assignedTo: "",
    },
  });

  // Update form values if editing and modal opens
  useEffect(() => {
    if (initialData && open) {
      form.reset(initialData);
    }
  }, [initialData, open]);

  const handleSubmit = (data: TaskFormData) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Task" : "Edit Task"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill out the form to create a task"
              : "Update task details below"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Title</Label>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Description</Label>
                  <FormControl>
                    <Textarea
                      placeholder="Optional description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <Label>Priority</Label>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Label>Status</Label>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <Label>Assigned To</Label>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full">
                {mode === "create" ? "Create Task" : "Update Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
