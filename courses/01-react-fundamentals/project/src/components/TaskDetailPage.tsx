import { Link, useParams } from "react-router-dom";
import type { Task } from "./TaskList";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();

  const storedTasks = localStorage.getItem("task-app-tasks");

  let tasks: Task[] = [];

  try {
    tasks = storedTasks ? (JSON.parse(storedTasks) as Task[]) : [];
  } catch {
    tasks = [];
  }

  const task = tasks.find((item) => String(item.id) === id);

  if (!task) {
    return (
      <div id="task-detail-page">
        <h2>Task not found</h2>

        <Link id="task-detail-back" to="/challenge/21-react-router">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div id="task-detail-page">
      <h1>{task.title}</h1>

      <p>{task.description}</p>

      <p>Priority: {task.priority}</p>

      <p>Category: {task.category || "General"}</p>

      <p>Status: {task.completed ? "Completed" : "Not Completed"}</p>

      <Link id="task-detail-back" to="/challenge/21-react-router">
        Back to list
      </Link>
    </div>
  );
}
