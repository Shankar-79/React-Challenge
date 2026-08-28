"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "../store/store";

type StoreProviderProps = {
  children: ReactNode;
};

// useClient: Redux Provider must run on the client.
// Provider: Makes the Redux store available to Client Components.
// store: Provides the Redux Toolkit store to the application.
// configureStore: The Redux store is configured in app/store/store.ts.
// useSelector: Client Components can select Redux state through Provider.
// useDispatch: Client Components can dispatch Redux actions through Provider.
// configureStore: Redux Toolkit configures the application store.
// useSelector: Client Components use useSelector to read Redux state.
// useDispatch: Client Components use useDispatch to update Redux state.

export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
