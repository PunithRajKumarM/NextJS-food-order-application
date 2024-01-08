import { configureStore } from "@reduxjs/toolkit";
import CartSliceReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: CartSliceReducer,
  },
});

export default store;
