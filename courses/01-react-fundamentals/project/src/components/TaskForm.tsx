import { useState } from "react";
import type { Task } from "./TaskList";

interface TaskFormProps {
  onAddTask?: (task: Task) => void;
}

export default function TaskForm(_props: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");
    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      category,
      tags: parsedTags,
      dueDate: dueDate || undefined,
    };

    _props.onAddTask?.(newTask);

    setTitle("");
    setDescription("");
    setPriority("Low");
    setCategory("General");
    setTags("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "Low" | "Medium" | "High")
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Category</label>
        <select
          id="task-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div>
        <label>Tags</label>
        <input
          id="task-tags"
          type="text"
          placeholder="react,college,urgent"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="task-due-date">Due Date</label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <p id="task-form-error">{error}</p>

      <button type="submit">Add Task</button>
    </form>
  );
}
