import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/reducer/authSlice";
import downlineReducer from "../Redux/reducer/downlineSlicer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        downline: downlineReducer,
    },
});

export default store;
