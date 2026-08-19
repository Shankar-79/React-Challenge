import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slices/counterSlice"
import uiReducer from "./slices/uiSlice";
import usersReducers from "./slices/usersSlice";
import { apiSlice } from '../api/apiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    users: usersReducers,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch