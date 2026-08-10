import { useMemo } from "react";
import type { Task } from "./TaskList";

interface StatsPanelProps {
  tasks?: Task[];
  total?: number;
  completed?: number;
  active?: number;
  overdue?: number;
  completedPercentage?: number;
}

export default function StatsPanel(props: StatsPanelProps) {
  const stats = useMemo(() => {
    if (props.tasks) {
      const total = props.tasks.length;

      const completed = props.tasks.filter((task) => task.completed).length;

      const active = props.tasks.filter((task) => !task.completed).length;

      const overdue = props.tasks.filter((task) => {
        if (task.completed || !task.dueDate) {
          return false;
        }

        const dueDate = new Date(task.dueDate);
        const today = new Date();

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
    }

    return {
      total: props.total ?? 0,
      completed: props.completed ?? 0,
      active: props.active ?? 0,
      overdue: props.overdue ?? 0,
      completedPercentage: props.completedPercentage ?? 0,
    };
  }, [
    props.tasks,
    props.total,
    props.completed,
    props.active,
    props.overdue,
    props.completedPercentage,
  ]);

  return (
    <section id="stats-panel">
      <h2>Task Statistics</h2>

      <p>Total: {stats.total}</p>

      <p>
        Completed: {stats.completed} ({stats.completedPercentage}%)
      </p>

      <p>Active: {stats.active}</p>

      <p>Overdue: {stats.overdue}</p>

      <div
        role="progressbar"
        aria-valuenow={stats.completedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{
            width: `${stats.completedPercentage}%`,
            height: "10px",
          }}
        />
      </div>
    </section>
  );
}
