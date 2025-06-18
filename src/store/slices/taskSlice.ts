import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "@/src/types/task";
import { v4 as uuidv4 } from "uuid";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return new Promise<Task[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 500);
  });
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<Omit<Task, "id" | "createdAt" | "updatedAt">>
    ) => {
      const now = new Date().toISOString();
      const newTask: Task = {
        ...action.payload,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
      };
      state.tasks.push(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Task> }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload.updates);
        task.updatedAt = new Date().toISOString();
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading tasks";
      });
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
