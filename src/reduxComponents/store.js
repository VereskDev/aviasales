import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filterSlice";
import ticketsReducer from "./ticketSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
