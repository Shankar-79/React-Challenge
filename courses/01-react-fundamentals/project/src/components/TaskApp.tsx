import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import type { Task } from "./TaskList";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import FilterBar from "./FilterBar";

interface TaskAppProps {
  tasks?: Task[];
  setTasks?: Dispatch<SetStateAction<Task[]>>;
  dispatch?: (action: { type: string; payload?: unknown }) => void;
  showForm?: boolean;
  countFormat?: string;
  showFilterBar?: boolean;
  showStatsPanel?: boolean;
  onDelete?: (id: string | number) => void;
  linkToTaskDetail?: boolean;
}

export default function TaskApp(props: TaskAppProps) {
  const { tasks = [], setTasks, showForm } = props;

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [sortOrder, setSortOrder] = useState("recent");

  const [editingId, setEditingId] = useState<string | number | null>(null);

  const [searchText, setSearchText] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleAddTask = (task: Task) => {
    setTasks?.((prev) => [...prev, task]);
  };

  const handleToggle = (id: string | number) => {
    setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const handleUpdateTask = (id: string | number, updates: Partial<Task>) => {
    setTasks?.((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  };

  const categories = [
    ...new Set(tasks.map((task) => task.category || "General")),
  ];

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

  const sortedTasks = [...filteredTasks];

  switch (sortOrder) {
    case "high":
      sortedTasks.sort(
        (a, b) => priorityValue[b.priority] - priorityValue[a.priority],
      );
      break;

    case "low":
      sortedTasks.sort(
        (a, b) => priorityValue[a.priority] - priorityValue[b.priority],
      );
      break;

    case "alpha":
      sortedTasks.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, {
          sensitivity: "base",
        }),
      );
      break;
    case "due":
      sortedTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
      break;

    case "recent":
    default:
      break;
  }

  return (
    <>
      {showForm && <TaskForm onAddTask={handleAddTask} />}

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
        <TaskList
          tasks={sortedTasks}
          onToggle={handleToggle}
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
      )}
    </>
  );
}
