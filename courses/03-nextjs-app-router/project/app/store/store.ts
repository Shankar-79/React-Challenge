import { configureStore, createSlice } from '@reduxjs/toolkit'

// Provider: The Redux Provider consumes this configured store.
// useSelector: Client Components read RootState from this store.
// useDispatch: Client Components dispatch AppDispatch actions.
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
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch