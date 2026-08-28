import { configureStore, createSlice } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

type CounterState = {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
  },
})

export const { increment, decrement, reset } = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,

    // RTK Query reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  // RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// configureStore: Creates the Redux Toolkit store.
// apiReducer: Adds the RTK Query API reducer.
// apiMiddleware: Adds RTK Query middleware.
// Provider: StoreProvider exposes this store to Client Components.
// useSelector: Client Components can read Redux state.
// useDispatch: Client Components can dispatch Redux actions.
// createApi: The RTK Query API is defined in apiSlice.ts.
// fetchBaseQuery: The API slice uses fetchBaseQuery for HTTP requests.
// useQuery: Generated RTK Query hooks consume the API store.
// useMutation: Generated RTK Query mutation hooks consume the API store.