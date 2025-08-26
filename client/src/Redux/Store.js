import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/reducer/authSlice";
import downlineReducer from "../Redux/reducer/downlineSlicer";
import withdrawlSlicer from "../Redux/reducer/withdrawlSlicer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        downline: downlineReducer,
        withrawal: withdrawlSlicer,
    },
});

export default store;
