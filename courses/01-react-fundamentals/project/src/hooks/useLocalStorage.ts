import { useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue === null) {
        return initialValue;
      }

      return JSON.parse(storedValue) as T;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (
    newValue: T | ((prev: T) => T),
  ) => {
    setValue((previousValue) => {
      const updatedValue =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(previousValue)
          : newValue;

      try {
        localStorage.setItem(
          key,
          JSON.stringify(updatedValue),
        );
      } catch {
        // Ignore localStorage errors.
      }

      return updatedValue;
    });
  };

  return [value, setStoredValue];
}