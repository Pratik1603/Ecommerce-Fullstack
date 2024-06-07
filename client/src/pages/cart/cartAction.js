import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// use of axios to fetch
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const response = await axios.get(`http://localhost:8000/api/cart?userId=${userId}`);
  return response.data;
});
// update the cart
export const updateCart = createAsyncThunk('cart/updateCart', async ({ userId, productId, quantity }) => {
  const response = await axios.post(`http://localhost:8000/api/cart`, { userId, productId, quantity });
  return response.data;
});
// use to rev=move item from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ userId, productId }, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8000/api/cart', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not remove item from cart');
        }
        return productId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});