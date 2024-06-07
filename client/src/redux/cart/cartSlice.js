import { createSlice } from '@reduxjs/toolkit';
import { fetchCart, updateCart, removeFromCart } from '../../pages/cart/cartAction.js';
const initialState = {
  cart: null,
  loading: false,
  error: null,
};
// Redux function for cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartUpdateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    cartUpdateSuccess: (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;
    },
    cartUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// use of extra reducers

export const { cartUpdateStart, cartUpdateSuccess, cartUpdateFailure } = cartSlice.actions;
export default cartSlice.reducer;
