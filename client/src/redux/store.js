import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/usrSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
