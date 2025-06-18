export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDateBefore?: string;
  dueDateAfter?: string;
}

export type SortOption = "dueDate" | "priority" | "createdAt";

export interface TaskStatistics {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  overdue: number;
}
