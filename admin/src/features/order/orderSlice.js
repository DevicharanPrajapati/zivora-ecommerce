// src/admin/features/order/orderSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrdersThunk,
  fetchOrderByIdThunk,
  updateOrderStatusThunk,
  updatePaymentStatusThunk,
} from "./orderThunks";

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },

    clearOrderError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // Fetch All Orders
      // ==========================================
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Fetch Order By ID
      // ==========================================
      .addCase(fetchOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Update Order Status
      // ==========================================
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;

        const updatedOrder = action.payload;

        // Update Orders List
        state.orders = state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );

        // Update Selected Order
        if (
          state.selectedOrder &&
          state.selectedOrder.id === updatedOrder.id
        ) {
          state.selectedOrder.order_status = updatedOrder.order_status;
        }
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Update Payment Status
      // ==========================================
      .addCase(updatePaymentStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentStatusThunk.fulfilled, (state, action) => {
        state.loading = false;

        const updatedOrder = action.payload;

        // Update Orders List
        state.orders = state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );

        // Update Selected Order
        if (
          state.selectedOrder &&
          state.selectedOrder.id === updatedOrder.id
        ) {
          state.selectedOrder.payment_status =
            updatedOrder.payment_status;
        }
      })
      .addCase(updatePaymentStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedOrder, clearOrderError } = orderSlice.actions;

export default orderSlice.reducer;