"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { addTask, deleteTask, updateTask } from "@/src/store/slices/taskSlice";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  Typography,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import BarChartIcon from "@mui/icons-material/BarChart";
import { TaskForm } from "@/src/components/tasks/TaskForm";
import { useRouter } from "next/navigation";

const TaskListPage = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const handleEdit = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setEditingTask(task);
      setOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
    setSnackbar({ message: "Task deleted", severity: "success" });
  };

  const handleSubmit = (task: any) => {
    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, updates: task }));
      setSnackbar({ message: "Task updated", severity: "success" });
    } else {
      dispatch(addTask(task));
      setSnackbar({ message: "Task created", severity: "success" });
    }
    setEditingTask(null);
    setOpen(false);
  };

  const handleRowClick = (id: string) => {
    router.push(`/tasks/${id}`);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "priority", headerName: "Priority", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          showInMenu
          onClick={() => handleEdit(params.id.toString())}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
          onClick={() => handleDelete(params.id.toString())}
        />,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
      <header className="mb-8 text-center">
        <Typography
          variant="h4"
          className="font-bold text-gray-800 dark:text-white mb-2"
        >
          Task Management Dashboard
        </Typography>
        <Typography
          variant="subtitle1"
          className="text-gray-600 dark:text-gray-300"
        >
          View, create, and manage your tasks efficiently
        </Typography>
      </header>

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
          startIcon={<ViewKanbanIcon />}
          onClick={() => router.push("/tasks/kanban")}
        >
          Kanban View
        </Button>
        <Button
          variant="outlined"
          startIcon={<BarChartIcon />}
          onClick={() => router.push("/tasks/statistics")}
        >
          Statistics
        </Button>
      </Stack>

      <div className="flex justify-end mb-4">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Task
        </Button>
      </div>

      <Card className="shadow-lg">
        <div className="h-[500px] p-4 bg-white dark:bg-gray-300 rounded-lg">
          <DataGrid
            rows={tasks}
            columns={columns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            onRowClick={(params) => handleRowClick(params.id.toString())}
            sx={{
              color: "inherit",
              backgroundColor: "transparent",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f3f4f6",
              },
            }}
          />
        </div>
      </Card>

      <Dialog
        open={open}
        onClose={() => {
          setEditingTask(null);
          setOpen(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editingTask ? "Edit Task" : "Create Task"}</DialogTitle>
        <DialogContent>
          <TaskForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingTask(null);
              setOpen(false);
            }}
            initialValues={editingTask}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar(null)}
          severity={snackbar?.severity}
          variant="filled"
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TaskListPage;
