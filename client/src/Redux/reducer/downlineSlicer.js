import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


// redux/slices/downlineSlice.js
export const fetchDownlineUsers = createAsyncThunk(
    "downline/fetchDownlineUsers",
    async (filters = {}, { rejectWithValue }) => {
        try {
            const { filter, startDate, endDate } = filters;
            const params = new URLSearchParams();

            if (filter) params.append('filter', filter);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const res = await api.get(
                `/auth/get-downline-user?${params.toString()}`,
                { withCredentials: true }
            );

            // console.log("📌 Downline API response:", res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch downline users"
            );
        }
    }
);


// ✅ Thunk to fetch bet history
export const fetchGameHistory = createAsyncThunk(
    "gameHistory/fetchGameHistory",
    async ({ page = 1, size = 50 }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/get-bet-history", { page, size });
              console.log("responseddddddddddd",response.data);
            return response.data;
          
             
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);

export const getSingleUserById = createAsyncThunk(
    "user/getSingleUserById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/auth/getsingleuserbyid/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);


const downlineSlice = createSlice({
    name: "downline",
    name: "gameHistory",
    initialState: {
        users: [],
        singleuser: null,
        depositeData: [],
        loading: false,
        error: null,
    },
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    reducers: {
        resetHistory: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //downlineSlice
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
            })
            //bet history
            .addCase(fetchGameHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload?.data || null;
            })
            .addCase(fetchGameHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch game history";
            })
            //Single User
            .addCase(getSingleUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleuser = action.payload?.user || null;
                state.data = action.payload || null;
            })
            .addCase(getSingleUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch game history";
            });


    },
});

export default downlineSlice.reducer;
