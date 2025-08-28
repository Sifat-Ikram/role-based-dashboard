import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import dashboardReducer from "./slices/dashboardSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
