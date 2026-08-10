import { useState, type Dispatch, type SetStateAction } from "react";
import type { Task } from "./TaskList";

interface TaskCardProps {
  id: string | number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  completed?: boolean;
  category?: string;
  tags?: string[];
  dueDate?: string | number;
  onToggle?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onUpdateTask?: (id: string | number, updates: Partial<Task>) => void;
  editingId?: string | number | null;
  setEditingId?: Dispatch<SetStateAction<string | number | null>>;
}

export default function TaskCard(props: TaskCardProps) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [priority, setPriority] = useState(props.priority);
  const [dueDate, setDueDate] = useState(
    props.dueDate ? String(props.dueDate) : "",
  );

  const [localEditing, setLocalEditing] = useState(false);

  const isCompleted = props.completed ?? false;

  const isEditing =
    props.editingId !== undefined ? props.editingId === props.id : localEditing;

  const startEditing = () => {
    setTitle(props.title);
    setDescription(props.description);
    setPriority(props.priority);
    setDueDate(props.dueDate ? String(props.dueDate) : "");

    if (props.setEditingId) {
      props.setEditingId(props.id);
    } else {
      setLocalEditing(true);
    }
  };

  const stopEditing = () => {
    if (props.setEditingId) {
      props.setEditingId(null);
    } else {
      setLocalEditing(false);
    }
  };

  const handleSave = () => {
    if (!title.trim()) return;

    props.onUpdateTask?.(props.id, {
      title,
      description,
      priority,
      dueDate: dueDate || undefined,
    });

    stopEditing();
  };

  const handleCancel = () => {
    setTitle(props.title);
    setDescription(props.description);
    setPriority(props.priority);
    setDueDate(props.dueDate ? String(props.dueDate) : "");

    stopEditing();
  };

  const category = props.category || "General";
  const tags = props.tags ?? [];

  const getDueDateInfo = () => {
    if (!props.dueDate) {
      return {
        label: "",
        overdue: false,
      };
    }

    const due = new Date(props.dueDate);

    if (Number.isNaN(due.getTime())) {
      return {
        label: "",
        overdue: false,
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDay = new Date(due);
    dueDay.setHours(0, 0, 0, 0);

    const difference =
      (dueDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (!isCompleted && difference < 0) {
      return {
        label: "Overdue",
        overdue: true,
      };
    }

    if (difference === 0) {
      return {
        label: "Due Today",
        overdue: false,
      };
    }

    if (difference > 0 && difference <= 3) {
      return {
        label: "Due Soon",
        overdue: false,
      };
    }

    return {
      label: "",
      overdue: false,
    };
  };

  const dueDateInfo = getDueDateInfo();

  return (
    <article id="task-card">
      {props.onToggle && (
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => props.onToggle?.(props.id)}
        />
      )}

      {isEditing ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <h2
          style={{
            textDecoration: isCompleted ? "line-through" : "none",
          }}
        >
          {props.title}
        </h2>
      )}

      {isEditing ? (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <p
          style={{
            textDecoration: isCompleted ? "line-through" : "none",
          }}
        >
          {props.description}
        </p>
      )}

      {isEditing ? (
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "Low" | "Medium" | "High")
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      ) : (
        <p>Priority: {props.priority}</p>
      )}

      <p id="task-category">Category: {category}</p>

      <div id="task-tags">
        {tags.map((tag) => (
          <span key={tag} data-tag={tag}>
            {tag}
          </span>
        ))}
      </div>

      {isEditing ? (
        <div>
          <label htmlFor="task-due-date">Due Date</label>
          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      ) : (
        props.dueDate && (
          <p
            id="task-due-date"
            data-overdue={dueDateInfo.overdue ? "true" : "false"}
          >
            Due: {new Date(props.dueDate).toLocaleDateString()}
            {dueDateInfo.label && ` - ${dueDateInfo.label}`}
          </p>
        )
      )}

      <p>{isCompleted ? "Completed" : "Not Completed"}</p>

      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>

          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={startEditing}>Edit</button>

          {props.onDelete && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  props.onDelete?.(props.id);
                }
              }}
            >
              Delete
            </button>
          )}
        </>
      )}
    </article>
  );
}
