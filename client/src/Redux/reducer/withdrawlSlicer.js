
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// ✅ Thunk to create withdrawal request
export const createWithdrawal = createAsyncThunk(
    "withdrawal/createWithdrawal",
    async ({ amount, usdt_address }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/auth/user-withdrowal",
                { amount, usdt_address },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);

const withdrawalSlice = createSlice({
    name: "withdrawal",
    initialState: {
        loading: false,
        success: false,
        error: null,
        withdrawal: null,
    },
    reducers: {
        resetWithdrawalState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.withdrawal = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWithdrawal.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createWithdrawal.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.withdrawal = action.payload;
            })
            .addCase(createWithdrawal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Withdrawal failed";
            });
    },
});

export const { resetWithdrawalState } = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
