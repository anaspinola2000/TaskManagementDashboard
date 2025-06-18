"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Fade,
  Badge,
  Button,
  Stack,
} from "@mui/material";
import { useAppSelector } from "@/src/store/hooks";
import { getTaskStatistics } from "@/src/utils/taskUtils";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";

export default function TaskStatisticsPage() {
  const router = useRouter();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const stats = useMemo(() => getTaskStatistics(tasks), [tasks]);

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.total,
      color: "text-blue-600",
      icon: <AssignmentIcon fontSize="large" className="text-blue-500" />,
    },
    {
      label: "Completed",
      value: stats.completed,
      color: "text-green-600",
      icon: <CheckCircleIcon fontSize="large" className="text-green-500" />,
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      color: "text-yellow-600",
      icon: (
        <HourglassBottomIcon fontSize="large" className="text-yellow-500" />
      ),
    },
    {
      label: "To Do",
      value: stats.todo,
      color: "text-gray-600",
      icon: <ListAltIcon fontSize="large" className="text-gray-500" />,
    },
    {
      label: "Overdue",
      value: stats.overdue,
      color: "text-red-600",
      icon: <ErrorIcon fontSize="large" className="text-red-500" />,
      badge: stats.overdue > 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Navegación superior */}
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
          startIcon={<ViewKanbanIcon />}
          onClick={() => router.push("/kanban")}
        >
          Kanban View
        </Button>
      </Stack>

      <Typography
        variant="h4"
        gutterBottom
        className="text-gray-800 dark:text-white"
      >
        Task Statistics
      </Typography>

      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {statCards.map((stat, index) => (
          <Fade in timeout={400 + index * 150} key={stat.label}>
            <Card elevation={4} className="p-4">
              <CardContent className="flex items-center gap-4">
                {stat.badge ? (
                  <Badge badgeContent="!" color="error">
                    {stat.icon}
                  </Badge>
                ) : (
                  stat.icon
                )}
                <Box>
                  <Typography variant="subtitle2" className={`${stat.color}`}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        ))}
      </Box>
    </div>
  );
}
