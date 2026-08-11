import React, { useState, type Dispatch, type SetStateAction } from "react";
import type { Task } from "./TaskList";
import Button from "./Button";
import Badge from "./Badge";
import StatusIndicator from "./StatusIndicator";
import { Link } from "react-router-dom";

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
  linkToTaskDetail?: boolean;
}

function TaskCard(props: TaskCardProps) {
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
          {props.linkToTaskDetail ? (
            <Link to={`/challenge/21-react-router/task/${props.id}`}>
              {props.title}
            </Link>
          ) : (
            props.title
          )}
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
        <p>
          Priority: <Badge variant="priority">{props.priority}</Badge>
        </p>
      )}

      <p id="task-category">
        Category: <Badge variant="category">{category}</Badge>
      </p>

      <div id="task-tags">
        {tags.map((tag) => (
          <Badge key={tag} variant="tag">
            <span data-tag={tag}>{tag}</span>
          </Badge>
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
          </p>
        )
      )}

      {dueDateInfo.label === "Overdue" && <StatusIndicator status="overdue" />}

      {dueDateInfo.label === "Due Today" && (
        <StatusIndicator status="due-today" />
      )}

      {dueDateInfo.label === "Due Soon" && (
        <StatusIndicator status="due-soon" />
      )}

      {isCompleted && <StatusIndicator status="completed" />}

      {isEditing ? (
        <>
          <Button variant="Primary" onClick={handleSave}>
            Save
          </Button>

          <Button variant="Secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button variant="Secondary" onClick={startEditing}>
            Edit
          </Button>

          {props.onDelete && (
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  props.onDelete?.(props.id);
                }
              }}
            >
              Delete
            </Button>
          )}
        </>
      )}
    </article>
  );
}
export default React.memo(TaskCard);
