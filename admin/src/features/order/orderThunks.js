// src/admin/features/order/orderThunks.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
} from "./orderAPI";

// ==========================================
// Fetch All Orders
// ==========================================
export const fetchOrdersThunk = createAsyncThunk(
  "adminOrder/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const orders = await getOrders();
      return orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ==========================================
// Fetch Order Details
// ==========================================
export const fetchOrderByIdThunk = createAsyncThunk(
  "adminOrder/fetchOrderById",
  async (orderId, thunkAPI) => {
    try {
      const order = await getOrderById(orderId);
      return order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ==========================================
// Update Order Status
// ==========================================
export const updateOrderStatusThunk = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      return updatedOrder;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ==========================================
// Update Payment Status
// ==========================================
export const updatePaymentStatusThunk = createAsyncThunk(
  "adminOrder/updatePaymentStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const updatedOrder = await updatePaymentStatus(orderId, status);
      return updatedOrder;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);