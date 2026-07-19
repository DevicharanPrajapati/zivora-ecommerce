import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDashboardStats,
  getRecentOrders,
} from "./dashboardAPI";

// ==============================
// Dashboard Statistics
// ==============================
export const getDashboardStatsThunk = createAsyncThunk(
  "dashboard/getDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDashboardStats();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ==============================
// Recent Orders
// ==============================
export const getRecentOrdersThunk = createAsyncThunk(
  "dashboard/getRecentOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRecentOrders();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);