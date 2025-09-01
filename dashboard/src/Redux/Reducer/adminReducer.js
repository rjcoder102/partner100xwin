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
    } catch (error) {
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
      const response = await api.put(
        `/update-user-status/${id}`,
        { status },
        {
          withCredentials: true,
          credentials: true,
        }
      );
      return response.data;
    } catch (error) {
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
      return rejectWithValue(error.response?.data || "Password update failed");
    }
  }
);
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ newPassword, oldPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/auth/password-update",
        { newPassword, oldPassword },
        {
          withCredentials: true,
        }
      );
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Password update failed");
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
      const response = await api.put(
        `/update-withdrawal-status/${id}`,
        { status },
        {
          withCredentials: true,
          credentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getDownline = createAsyncThunk(
  "user/getDownline",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/get-downline-user/${id}`, {
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

export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/get-user-by-id/${id}`, {
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

export const MountSingle = createAsyncThunk(
  "user/MountSingle",
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await api.post(
        `/sigle-user-setelments/${id}`,
        {withCredentials: true,
        credentials: true,}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
    }
);


export const MountAll = createAsyncThunk(
  "user/MountAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/user-setelments`,
        {withCredentials: true,
        credentials: true,}
      );
      return response.data;
    }
    catch (error) {
        return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
    }
);


export const getLengthofData = createAsyncThunk(
  "user/getLengthofData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/get-data`, {
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
export const getdownrecharge = createAsyncThunk(
  "user/getdownrecharge",
  async (code, { rejectWithValue }) => {
    try {
      const response = await api.get(`/get-downline-recharge/${code}`, {
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
    staticData: null,
    downrechage: [],
    downlinedata: [],
    singleuser: null,
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
      .addCase(getDownline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDownline.fulfilled, (state, action) => {
        state.loading = false;
        state.downlinedata = action.payload.data;
      })
      .addCase(getDownline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleuser = action.payload.data;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLengthofData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLengthofData.fulfilled, (state, action) => {
        state.loading = false;
        state.staticData = action.payload.data;
      })
      .addCase(getLengthofData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getdownrecharge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getdownrecharge.fulfilled, (state, action) => {
        state.loading = false;
        state.downrechage = action.payload.data;
      })
      .addCase(getdownrecharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default adminSlice.reducer;
