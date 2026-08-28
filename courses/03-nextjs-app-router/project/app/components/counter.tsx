"use client";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../store/store";
import { decrement, increment, reset } from "../store/store";

// useClient: Redux hooks require a Client Component.
// useSelector: Reads the counter value from Redux.
// useDispatch: Dispatches Redux actions.
// Redux: Counter state is stored globally.

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <section
      style={{
        textAlign: "center",
        margin: "2rem 0",
        padding: "1.5rem",
      }}
    >
      <h2>Redux Counter</h2>

      <p
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {count}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <button type="button" onClick={() => dispatch(decrement())}>
          −
        </button>

        <button type="button" onClick={() => dispatch(reset())}>
          Reset
        </button>

        <button type="button" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
    </section>
  );
}
