import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Reducer/adminReducer";

const store = configureStore({
    reducer: {
        admin: adminReducer
    },
});

export default store;
