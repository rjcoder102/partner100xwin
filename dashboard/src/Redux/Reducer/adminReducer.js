import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const AllUsers = createAsyncThunk(
    "user/getSingleUserById",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/get-all-users`, {
                withCredentials: true,
                   credentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);


const adminSlice = createSlice({
    name: "admin",
    name: "adminslice",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //downlineSlice
            .addCase(AllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;

            })
            .addCase(AllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })


    },
});

export default adminSlice.reducer;