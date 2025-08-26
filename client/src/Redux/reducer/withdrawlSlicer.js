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
            console.log("createWithdrawal respose", createWithdrawal);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);

// ✅ Thunk to get downline deposit data
export const getDownlineDeposits = createAsyncThunk(
    "transactions/getDownlineDeposits",
    async (filters = {}, { rejectWithValue }) => {
        try {
            const { filter, startDate, endDate } = filters;
            const params = new URLSearchParams();

            if (filter) params.append('filter', filter);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const response = await api.get(
                `/auth/get-downline-deposite?${params.toString()}`,
                { withCredentials: true }
            );

            console.log("API Response111kkk:", response.data);

            // Handle different possible response structures
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch deposit data" }
            );
        }
    }
);

// ✅ Thunk to get downline withdrawal data
export const getDownlineWithdrawals = createAsyncThunk(
    "transactions/getDownlineWithdrawals",
    async (filters = {}, { rejectWithValue }) => {
        try {
            const { filter, startDate, endDate } = filters;
            const params = new URLSearchParams();

            if (filter) params.append('filter', filter);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const response = await api.get(
                `/auth/get-downline-withdrowal?${params.toString()}`,
                { withCredentials: true }
            );
            
            console.log("Withdrawal response data:", response.data);
            
            // Handle different possible response structures
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch withdrawal data" }
            );
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    withdrawal: null,
    downlineDeposits: {  // Changed from 'deposits' to 'downlineDeposits'
        data: [],
        loading: false,
        error: null
    },
    downlineWithdrawals: {  // Changed from 'withdrawals' to 'downlineWithdrawals'
        data: [],
        loading: false,
        error: null
    }
};

const withdrawalSlice = createSlice({
    name: "withdrawal",
    initialState,
    reducers: {
        resetWithdrawalState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.withdrawal = null;
        },
        resetDepositsState: (state) => {
            state.downlineDeposits.loading = false;
            state.downlineDeposits.error = null;
        },
        resetWithdrawalsState: (state) => {
            state.downlineWithdrawals.loading = false;
            state.downlineWithdrawals.error = null;
        },
        clearTransactionsData: (state) => {
            state.downlineDeposits.data = [];
            state.downlineWithdrawals.data = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Withdrawal
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
            })

            // Get Downline Deposits
            .addCase(getDownlineDeposits.pending, (state) => {
                state.downlineDeposits.loading = true;
                state.downlineDeposits.error = null;
            })
            .addCase(getDownlineDeposits.fulfilled, (state, action) => {
                // console.log("action",action.payload);
                state.downlineDeposits.loading = false;
                state.downlineDeposits.data = action.payload.downlineDeposites
;
            })
            .addCase(getDownlineDeposits.rejected, (state, action) => {
                
                state.downlineDeposits.loading = false;
                state.downlineDeposits.error = action.payload?.message || "Failed to fetch deposits";
            })

            // Get Downline Withdrawals
            .addCase(getDownlineWithdrawals.pending, (state) => {
                state.downlineWithdrawals.loading = true;
                state.downlineWithdrawals.error = null;
            })
            .addCase(getDownlineWithdrawals.fulfilled, (state, action) => {
                 console.log("asdfghjkl",action.payload);
                state.downlineWithdrawals.loading = false;
                state.downlineWithdrawals.data = action.payload;
            })
            .addCase(getDownlineWithdrawals.rejected, (state, action) => {
                state.downlineWithdrawals.loading = false;
                state.downlineWithdrawals.error = action.payload?.message || "Failed to fetch withdrawals";
            });
    },
});

export const {
    resetWithdrawalState,
    resetDepositsState,
    resetWithdrawalsState,
    clearTransactionsData
} = withdrawalSlice.actions;

export default withdrawalSlice.reducer;