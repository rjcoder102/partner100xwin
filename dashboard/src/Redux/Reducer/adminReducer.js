import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const AdminLogin = createAsyncThunk(
    "admin/adminLogin",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin-login", credentials, {
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

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete-user-by-id/${id}`, {
                withCredentials: true,
                credentials: true,
            });
            return response.data;
        }
        catch (error) {
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
        userInfo: null,
        token: null,
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
               .addCase(AdminLogin.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(AdminLogin.fulfilled, (state, action) => {
                    state.loading = false;
                    state.userInfo = action.payload.user;
                    state.token = action.payload.token;
                  })
                  .addCase(AdminLogin.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                  })


    },
});

export default adminSlice.reducer;