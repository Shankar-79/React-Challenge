import { useAppDispatch, useAppSelector } from "../store/hooks";
import { decrement, increment } from "../store/slices/counterSlice";

/** Stub: Complete Challenge 03 (Reading and Dispatching) per README. */
export default function CounterView() {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div data-testid="counter-view">
      <div data-testid="counter-value">{count}</div>
      <button data-testid="increment-btn" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button data-testid="decrement-btn" onClick={() => dispatch(decrement())}>
        decrement
      </button>
    </div>
  );
}
