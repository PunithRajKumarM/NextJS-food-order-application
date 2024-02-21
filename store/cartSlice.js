import { createSlice, current } from "@reduxjs/toolkit";

const initialState = (typeof window !== "undefined" &&
  JSON.parse(localStorage.getItem("food-app-user"))) || { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartDetail(state, action) {
      const payload = action.payload;
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (!existingItem) {
        state.cart.push({ ...payload, quantity: 1 });
      } else {
        existingItem.quantity++;
      }

      localStorage.setItem("food-app-user", JSON.stringify(state));
      return state;
    },
    removeCartDetail(state, action) {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );

      const existingItem = state.cart[existingItemIndex];

      if (existingItem["quantity"] === 1) {
        state.cart.splice(existingItemIndex, 1);
      } else {
        existingItem["quantity"] = existingItem["quantity"] - 1;
      }

      localStorage.setItem("food-app-user", JSON.stringify(state));
      return state;
    },
  },
});

export const { addCartDetail, removeCartDetail } = cartSlice.actions;
export default cartSlice.reducer;
