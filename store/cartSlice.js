import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartDetail(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { addCartDetail } = cartSlice.actions;
export default cartSlice.reducer;
