"use client";

// useClient: This component is a Client Component.
// useState: React state is required for the interactive counter.
// serverComponent: The parent page remains a Server Component.

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>Interactive Counter</h2>
      <p>Count: {count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button type="button" onClick={() => setCount(0)}>
        Reset
      </button>
    </section>
  );
}
