import { RootState } from "../index";
import { filterTasks, sortTasks } from "@/src/utils/taskUtils";
import { FilterOptions, SortOption } from "@/src/types/task";

export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectTaskById = (id: string) => (state: RootState) =>
  state.tasks.tasks.find((task) => task.id === id);

export const selectFilteredSortedTasks =
  (filters: FilterOptions, sort: SortOption) => (state: RootState) => {
    const filtered = filterTasks(state.tasks.tasks, filters);
    return sortTasks(filtered, sort);
  };
