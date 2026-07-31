import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./cartAPI";

// Fetch Cart
export const fetchCartThunk = createAsyncThunk(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    try {
      return await api.getCart(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Add To Cart
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId }, thunkAPI) => {
    try {
      await api.addToCart(userId, productId);

      // Refresh cart after adding
      return await api.getCart(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update Quantity
export const updateQuantityThunk = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartId, quantity, userId }, thunkAPI) => {
    try {
      await api.updateQuantity(cartId, quantity);

      // Refresh cart
      return await api.getCart(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Remove Item
export const removeCartItemThunk = createAsyncThunk(
  "cart/removeItem",
  async ({ cartId, userId }, thunkAPI) => {
    try {
      await api.removeCartItem(cartId);

      // Refresh cart
      return await api.getCart(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Clear Cart
export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (userId, thunkAPI) => {
    try {
      await api.clearCart(userId);

      return [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);