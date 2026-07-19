import { createSlice } from "@reduxjs/toolkit";
import {
  getDashboardStatsThunk,
  getRecentOrdersThunk,
} from "./dashboardThunks";

const initialState = {
  stats: {
    products: 0,
    categories: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
  },

  recentOrders: [],

  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ======================
      // Dashboard Stats
      // ======================
      .addCase(getDashboardStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDashboardStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })

      .addCase(getDashboardStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // Recent Orders
      // ======================
      .addCase(getRecentOrdersThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRecentOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.recentOrders = action.payload;
      })

      .addCase(getRecentOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;