import { Task, FilterOptions, SortOption, TaskStatistics } from "../types/task";

export function filterTasks(tasks: Task[], filters: FilterOptions): Task[] {
  return tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (
      filters.dueDateBefore &&
      new Date(task.dueDate) > new Date(filters.dueDateBefore)
    )
      return false;
    if (
      filters.dueDateAfter &&
      new Date(task.dueDate) < new Date(filters.dueDateAfter)
    )
      return false;
    return true;
  });
}

export function sortTasks(tasks: Task[], sortBy: SortOption): Task[] {
  return [...tasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
  });
}

export function getTaskStatistics(tasks: Task[]): TaskStatistics {
  const now = new Date();
  let stats: TaskStatistics = {
    total: tasks.length,
    completed: 0,
    inProgress: 0,
    todo: 0,
    overdue: 0,
  };

  tasks.forEach((task) => {
    if (task.status === "done") stats.completed++;
    if (task.status === "in-progress") stats.inProgress++;
    if (task.status === "todo") stats.todo++;
    if (new Date(task.dueDate) < now && task.status !== "done") stats.overdue++;
  });

  return stats;
}
