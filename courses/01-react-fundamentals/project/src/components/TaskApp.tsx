import type { Dispatch, SetStateAction } from "react";
import type { Task } from "./TaskList";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

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

  const completedCount = tasks.filter((task) => task.completed).length;

  const totalCount = tasks.length;

  return (
    <>
      {showForm && <TaskForm onAddTask={handleAddTask} />}

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        countText={`${completedCount} of ${totalCount} completed`}
      />
    </>
  );
}
