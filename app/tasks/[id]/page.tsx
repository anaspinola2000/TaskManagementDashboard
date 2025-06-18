"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { updateTask } from "@/src/store/slices/taskSlice";
import { TaskForm } from "@/src/components/tasks/TaskForm";
import {
  Typography,
  Box,
  Button,
  Divider,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  const handleUpdate = (updates: any) => {
    dispatch(updateTask({ id: id as string, updates }));
    setIsEditing(false);
  };

  if (!task) {
    return (
      <Box className="min-h-screen flex flex-col items-center justify-center px-4">
        <Typography variant="h6" color="error" gutterBottom>
          Task not found
        </Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-md">
        <CardContent>
          <Typography
            variant="h5"
            className="text-gray-800 dark:text-white mb-2 font-semibold"
          >
            Task Details
          </Typography>
          <Divider className="mb-4" />

          {!isEditing ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Title:</strong> {task.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Description:</strong> {task.description}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Status:</strong>
                <Chip
                  label={task.status}
                  color="primary"
                  size="small"
                  disabled={true}
                />
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Priority:</strong>{" "}
                <Chip
                  label={task.priority}
                  color="secondary"
                  size="small"
                  disabled={true}
                />
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Due Date:</strong> {task.dueDate}
              </Typography>
              <Typography
                variant="caption"
                className="block mt-4 text-gray-500"
              >
                Created: {task.createdAt} • Updated: {task.updatedAt}
              </Typography>

              <Stack direction="row" spacing={2} className="mt-6">
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  Edit Task
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/tasks")}
                >
                  Back to Task List
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle1" className="mb-4">
                Edit Task
              </Typography>
              <TaskForm
                initialValues={task}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditing(false)}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
