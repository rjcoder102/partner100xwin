import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


// ✅ Async thunk for fetching downline users
export const fetchDownlineUsers = createAsyncThunk(
    "downline/fetchDownlineUsers",
    async (filter, { rejectWithValue }) => {
        try {
            const res = await api.get(
                `/auth/get-downline-user?filter=${filter || ""}`, { withCredentials: true }
            );
            console.log("📌 Downline API response:", res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch downline users"
            );
        }
    }
);

const downlineSlice = createSlice({
    name: "downline",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDownlineUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDownlineUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                // console.log("state.users", state.users.data);

            })
            .addCase(fetchDownlineUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default downlineSlice.reducer;
