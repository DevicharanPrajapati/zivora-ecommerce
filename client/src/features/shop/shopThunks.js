import { createAsyncThunk } from "@reduxjs/toolkit";

import { getShopProducts } from "./shopAPI";

export const fetchShopProductsThunk = createAsyncThunk(
  "shop/fetchShopProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const products = await getShopProducts(filters);
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);