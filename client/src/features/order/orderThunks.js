import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
} from "./orderAPI";

// ==========================================
// Place Order
// ==========================================

export const placeOrderThunk = createAsyncThunk(
  "order/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      return await placeOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ==========================================
// Get User Orders
// ==========================================

export const fetchUserOrdersThunk = createAsyncThunk(
  "order/fetchUserOrders",
  async (userId, thunkAPI) => {
    try {
      return await getUserOrders(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ==========================================
// Get Order Details
// ==========================================

export const fetchOrderByIdThunk = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId, thunkAPI) => {
    try {
      return await getOrderById(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);