import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add more slices here as needed
  },
  // You can add middleware or devTools options here if needed
});

export default store;
