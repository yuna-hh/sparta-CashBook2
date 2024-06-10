import { configureStore } from "@reduxjs/toolkit";
import cashBookSlice from "./slices/cashBookSlice";

export const store = configureStore({
  reducer: {
    cashbook: cashBookSlice,
  },
});
