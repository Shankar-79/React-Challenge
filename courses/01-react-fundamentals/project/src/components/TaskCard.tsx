/**
 * Props required to render a task card.
 */
interface TaskCardProps {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  completed?: boolean;
  onToggle?: () => void;
}

/**
 * Displays the details of a single task.
 */
export default function TaskCard(props: TaskCardProps) {
  const isCompleted = props.completed ?? false;

  const completedStyle = {
    textDecoration: isCompleted ? "line-through" : "none",
  };

  return (
    <article id="task-card" data-completed={isCompleted}>
      {props.onToggle && (
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={props.onToggle}
        />
      )}

      <h2 style={completedStyle}>{props.title}</h2>

      <p style={completedStyle}>{props.description}</p>

      <p>Priority: {props.priority}</p>

      <p>{isCompleted ? "Completed" : "Not Completed"}</p>
    </article>
  );
}
