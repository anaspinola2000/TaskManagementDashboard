"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { updateTask } from "@/src/store/slices/taskSlice";
import { Task, TaskStatus } from "@/src/types/task";
import { useState } from "react";
import { Button, Stack, Typography, Box, Chip, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useRouter } from "next/navigation";

const statusList: TaskStatus[] = ["todo", "in-progress", "done"];
const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export default function NativeDnDPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null);

  const tasksByStatus = statusList.reduce((acc, status) => {
    acc[status] = tasks.filter((t) => t.status === status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleDragStart = (id: string) => setDraggedTaskId(id);
  const handleDrop = (status: TaskStatus) => {
    if (draggedTaskId) {
      dispatch(updateTask({ id: draggedTaskId, updates: { status } }));
      setDraggedTaskId(null);
      setDragOverStatus(null);
    }
  };
  const allowDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    setDragOverStatus(status);
  };

  return (
    <Box className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        className="mb-6"
      >
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={() => router.push("/")}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          startIcon={<AssignmentIcon />}
          onClick={() => router.push("/tasks")}
        >
          Dashboard
        </Button>
        <Button
          variant="outlined"
          startIcon={<BarChartIcon />}
          onClick={() => router.push("/tasks/statistics")}
        >
          Statistics
        </Button>
      </Stack>

      <Typography
        variant="h4"
        className="text-center mb-6 text-gray-800 dark:text-white"
      >
        Task Board
      </Typography>

      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {statusList.map((status) => (
          <Paper
            key={status}
            onDragOver={(e) => allowDrop(e, status)}
            onDrop={() => handleDrop(status)}
            elevation={3}
            className={`p-4 rounded-md transition-all duration-200
            ${dragOverStatus === status ? "border-2 border-blue-500" : ""}
            ${
              status === "todo"
                ? "bg-red-100 dark:bg-red-800"
                : status === "in-progress"
                ? "bg-yellow-100 dark:bg-yellow-700"
                : "bg-green-100 dark:bg-green-700"
            }
          `}
          >
            <Typography
              variant="h6"
              className="mb-4 text-blue-600 dark:text-blue-300"
            >
              {statusLabels[status]}
            </Typography>

            <Stack spacing={2}>
              {tasksByStatus[status].map((task) => (
                <Box
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="bg-gray-100 dark:bg-gray-400 rounded-md p-3 shadow cursor-move"
                >
                  <Typography
                    variant="subtitle1"
                    className="font-extrabold text-gray-900 dark:text-black"
                  >
                    {task.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {task.description}
                  </Typography>
                  <Stack direction="row" spacing={1} className="mt-2">
                    <Chip
                      label={task.priority}
                      size="small"
                      color="secondary"
                    />
                    <Chip label={task.dueDate} size="small" />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
