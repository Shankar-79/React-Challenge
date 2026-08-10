interface StatusIndicatorProps {
  status: "overdue" | "due-today" | "due-soon" | "completed";
}

export default function StatusIndicator(_props: StatusIndicatorProps) {
  const labels = {
    overdue: "Overdue",
    "due-today": "Due Today",
    "due-soon": "Due Soon",
    completed: "Completed",
  };
  return <span data-status={_props.status}>{labels[_props.status]}</span>;
}
