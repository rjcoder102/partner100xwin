import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/reducer/authSlice";
import downlineReducer from "../Redux/reducer/downlineSlicer";
import withdrawlReducer from "../Redux/reducer/withdrawlSlicer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        downline: downlineReducer,
        withrawal: withdrawlReducer,
    },
});

export default store;
