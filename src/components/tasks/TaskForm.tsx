"use client";

import { Task, TaskPriority, TaskStatus } from "@/src/types/task";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface TaskFormProps {
  initialValues?: Partial<Task>;
  onSubmit: (values: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialValues?.status ?? "todo"
  );
  const [priority, setPriority] = useState<TaskPriority>(
    initialValues?.priority ?? "medium"
  );
  const [dueDate, setDueDate] = useState(
    initialValues?.dueDate?.split("T")[0] ?? ""
  );

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      status,
      priority,
      dueDate: new Date(dueDate).toISOString(),
    });
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        select
        label="Priority"
        fullWidth
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
      <TextField
        select
        label="Status"
        fullWidth
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
        <MenuItem value="todo">To Do</MenuItem>
        <MenuItem value="in-progress">In Progress</MenuItem>
        <MenuItem value="done">Done</MenuItem>
      </TextField>
      <TextField
        label="Due Date"
        type="date"
        fullWidth
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Box display="flex" gap={2} justifyContent="flex-end">
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Stack>
  );
};
