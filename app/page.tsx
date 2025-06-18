"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
      <div className="max-w-2xl w-full">
        <div className="flex justify-center mb-6">
          <AssignmentIcon className="text-blue-600" sx={{ fontSize: 60 }} />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
          Task Management Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Organize, prioritize, and track your tasks with ease and clarity.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <Link href="/tasks">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon />}
              className="w-48"
            >
              Go to Tasks
            </Button>
          </Link>
          <Link href="/tasks/kanban">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ViewKanbanIcon />}
              className="w-48"
            >
              Kanban View
            </Button>
          </Link>
          <Link href="/tasks/statistics">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<BarChartIcon />}
              className="w-48"
            >
              View Statistics
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        <Feature icon="✅" title="Track Completion" />
        <Feature icon="📊" title="Visualize Progress" />
        <Feature icon="🧠" title="Stay Organized" />
      </div>
    </main>
  );
}

function Feature({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center transition-transform hover:scale-105">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
    </div>
  );
}
