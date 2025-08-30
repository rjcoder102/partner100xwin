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

export const getUser = createAsyncThunk(
  "user/get-user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/get-user", {
        withCredentials: true,
      });
      const data = response.data;
      return data;
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

export const updateUserStatus = createAsyncThunk(
    "admin/updateUserStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update-user-status/${id}`, { status }, {
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

export const profileUpdate = createAsyncThunk(
  "auth/profile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/profile-update", data, {
        withCredentials: true,
      });
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Password update failed"
      );
    }
  }
);
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({newPassword, oldPassword}, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/password-update", {newPassword, oldPassword}, {
        withCredentials: true,
      });
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Password update failed"
      );
    }
  }
);

export const AllWithdrawsals = createAsyncThunk(
    "user/getAllWithdrawsals",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/get-all-withdrawals`, {
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

export const updatewithdrawalStatus = createAsyncThunk(
    "admin/updatewithdrawalStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update-withdrawal-status/${id}`, { status }, {
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
        withdraws: [],
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
                  .addCase(getUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(getUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.userInfo = action.payload.data;
                    // console.log("state.userInfo", state.userInfo);
            
                  })
                  .addCase(getUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
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
                              .addCase(AllWithdrawsals.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(AllWithdrawsals.fulfilled, (state, action) => {
                    state.loading = false;
                    state.withdraws = action.payload.data;
                    // console.log("state.userInfo", state.userInfo);
            
                  })
                  .addCase(AllWithdrawsals.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                  })


    },
});

export default adminSlice.reducer;