import { createSlice } from "@reduxjs/toolkit";
import {
  placeOrderThunk,
  fetchUserOrdersThunk,
  fetchOrderByIdThunk,
} from "./orderThunks";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    clearOrderError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================
      // Place Order
      // =====================================

      .addCase(placeOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;

        // Optional:
        // state.orders.unshift(action.payload);
      })

      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================
      // Fetch User Orders
      // =====================================

      .addCase(fetchUserOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchUserOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================
      // Fetch Order By Id
      // =====================================

      .addCase(fetchOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })

      .addCase(fetchOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder, clearOrderError } = orderSlice.actions;

export default orderSlice.reducer;