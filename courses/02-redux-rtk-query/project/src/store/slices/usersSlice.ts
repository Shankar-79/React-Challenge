import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockApi } from "../../api/mockServer";

interface user{
    id: number;
    name: string;
}

interface usersState{
    list: user[];
    loading: boolean;
    error: string | null;
}

const initialState: usersState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchusers = createAsyncThunk(
    "users/fetchusers",
    async () => {
        return await mockApi.getUsers();
    }
);
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchusers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchusers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchusers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "failed to fetch users";
            });
    },
});
export default usersSlice.reducer