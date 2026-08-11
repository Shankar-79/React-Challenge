import type { Task } from "./TaskList";
import { useState, useEffect, useMemo, useCallback } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import FilterBar from "./FilterBar";
import StatsPanel from "./StatsPanel";
import { useTheme } from "../contexts/ThemeContext";
import ErrorBoundary from "./ErrorBoundary";
import {
  ADD_TASK,
  TOGGLE_TASK,
  UPDATE_TASK,
  type TaskAction,
} from "../reducers/taskReducer";

interface TaskAppProps {
  tasks?: Task[];
  dispatch?: (action: TaskAction) => void;
  showForm?: boolean;
  countFormat?: string;
  showFilterBar?: boolean;
  showStatsPanel?: boolean;
  onDelete?: (id: string | number) => void;
  linkToTaskDetail?: boolean;
}

export default function TaskApp(props: TaskAppProps) {
  const { tasks = [], dispatch, showForm } = props;

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [sortOrder, setSortOrder] = useState("recent");

  const [editingId, setEditingId] = useState<string | number | null>(null);

  const [searchText, setSearchText] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const stats = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter((task) => task.completed).length;

    const active = tasks.filter((task) => !task.completed).length;

    const overdue = tasks.filter((task) => {
      if (task.completed || !task.dueDate) {
        return false;
      }

      const dueDate = new Date(task.dueDate);
      const today = new Date();

      if (Number.isNaN(dueDate.getTime())) {
        return false;
      }

      dueDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return dueDate < today;
    }).length;

    const completedPercentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      active,
      overdue,
      completedPercentage,
    };
  }, [tasks]);

  useEffect(() => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleAddTask = useCallback(
    (task: Task) => {
      dispatch?.({
        type: ADD_TASK,
        payload: task,
      });
    },
    [dispatch],
  );

  const handleToggleTask = useCallback(
    (id: string | number) => {
      dispatch?.({
        type: TOGGLE_TASK,
        payload: id,
      });
    },
    [dispatch],
  );

  const handleUpdateTask = useCallback(
    (id: string | number, updates: Partial<Task>) => {
      dispatch?.({
        type: UPDATE_TASK,
        payload: {
          id,
          updates,
        },
      });
    },
    [dispatch],
  );

  const categories = [
    ...new Set(tasks.map((task) => task.category || "General")),
  ];

  const sortedTasks = useMemo(() => {
    let filteredTasks =
      filter === "active"
        ? tasks.filter((task) => !task.completed)
        : filter === "completed"
          ? tasks.filter((task) => task.completed)
          : tasks;

    if (categoryFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => (task.category || "General") === categoryFilter,
      );
    }

    if (debouncedSearch.trim() !== "") {
      const search = debouncedSearch.toLowerCase();

      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }

    const priorityValue = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    const sorted = [...filteredTasks];

    switch (sortOrder) {
      case "high":
        sorted.sort(
          (a, b) => priorityValue[b.priority] - priorityValue[a.priority],
        );
        break;

      case "low":
        sorted.sort(
          (a, b) => priorityValue[a.priority] - priorityValue[b.priority],
        );
        break;

      case "alpha":
        sorted.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, {
            sensitivity: "base",
          }),
        );
        break;

      case "due":
        sorted.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) {
            return 0;
          }

          if (!a.dueDate) {
            return 1;
          }

          if (!b.dueDate) {
            return -1;
          }

          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        break;

      case "recent":
      default:
        break;
    }

    return sorted;
  }, [tasks, filter, categoryFilter, debouncedSearch, sortOrder]);

  return (
    <>
      <button id="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>

      {showForm && <TaskForm onAddTask={handleAddTask} />}

      {props.showStatsPanel && (
        <StatsPanel
          tasks={tasks}
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          overdue={stats.overdue}
          completedPercentage={stats.completedPercentage}
        />
      )}

      {props.showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          searchText={searchText}
          setSearchText={setSearchText}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />
      )}

      {isSearching && searchText !== debouncedSearch && (
        <p id="searching-indicator">Searching...</p>
      )}

      {sortedTasks.length === 0 ? (
        <p id="filter-empty-message">No tasks found</p>
      ) : (
        <ErrorBoundary>
          <TaskList
            tasks={sortedTasks}
            onToggle={handleToggleTask}
            onDelete={props.onDelete}
            countText={
              props.countFormat === "tasks"
                ? `${tasks.length} Tasks`
                : `${tasks.filter((task) => task.completed).length} Completed`
            }
            onUpdateTask={handleUpdateTask}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        </ErrorBoundary>
      )}
    </>
  );
}
