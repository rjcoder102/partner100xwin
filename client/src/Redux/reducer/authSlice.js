// src/Redux/reducer/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // ✅ Axios instance with baseURL
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.token) {
        Cookies.set("token", res.data.token, { expires: 7 });
      }
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      return res.data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Async thunk for register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
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

// ✅ Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/otp-verify", { otp }, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// ✅ Resend OTP thunk
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/resend-otp", {}, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  }
);

// ✅ Logout API Call (Fixed: using api instead of axios)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/logout", {}, { withCredentials: true });

      // ✅ Remove token from localStorage
      localStorage.removeItem("token");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
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

// Utility to decode JWT token


const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return "";
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    user: null,
    token: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Get user by ID
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
      // ✅ Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.success = action.payload.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Logout API
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.token = null;
        state.error = null;
        state.success = "Logout successful";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
