// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import studentReducer from "./studentSlice";
import { apiSlice } from "./apiSliceForToolkit";

export const storeForToolkit = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    students: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(storeForToolkit.dispatch);