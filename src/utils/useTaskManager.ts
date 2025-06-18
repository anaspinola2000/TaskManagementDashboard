import { useState } from "react";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => tasks.find((task) => task.id === id);

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
  };
};
