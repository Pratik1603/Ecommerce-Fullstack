import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  error: null,
  loading: false,
};
// reducer function for products
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productFetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    productFetchSuccess: (state, action)=>{
      state.products = action.payload;
      // console.log(state.currentUser);
      state.loading = false;
      state.error = null;
    },
    productFetchFailure: (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
    
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteproductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteproductSuccess: (state) => {
      state.products= null;
      state.loading = false;
      state.error = null;
    },
    deleteproductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const {
  productFetchStart,
  productFetchSuccess,
  productFetchFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteproductStart,
  deleteproductSuccess,
  deleteproductFailure,
  
} = productSlice.actions;

export default productSlice.reducer;