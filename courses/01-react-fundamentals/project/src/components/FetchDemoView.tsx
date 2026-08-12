import { useEffect, useState } from "react";

interface TodoItem {
  id: number | string;
  title: string;
}

export default function FetchDemoView() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/todos.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: TodoItem[] = await response.json();

        setItems(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchItems();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p id="fetch-loading">Loading...</p>;
  }

  if (error) {
    return <p id="fetch-error">{error}</p>;
  }

  return (
    <ul id="fetch-list">
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
