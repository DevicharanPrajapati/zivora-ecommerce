import { createSlice } from "@reduxjs/toolkit";

import { fetchShopProductsThunk } from "./shopThunks";

const initialState = {
  products: [],
  loading: false,
  error: null,

  filters: {
    search: "",
    category: "",
    gender: "",
    sort: "newest",
    minPrice: 0,
    maxPrice: Infinity,
  },
};

const shopSlice = createSlice({
  name: "shop",
  initialState,

  reducers: {
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },

    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },

    setGender: (state, action) => {
      state.filters.gender = action.payload;
    },

    setSort: (state, action) => {
      state.filters.sort = action.payload;
    },

    setPriceRange: (state, action) => {
      const { minPrice, maxPrice } = action.payload;

      state.filters.minPrice = minPrice;
      state.filters.maxPrice = maxPrice;
    },

    clearFilters: (state) => {
      state.filters = {
        search: "",
        category: "",
        gender: "",
        sort: "newest",
        minPrice: 0,
        maxPrice: Infinity,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchShopProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchShopProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchShopProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  setSearch,
  setCategory,
  setGender,
  setSort,
  setPriceRange,
  clearFilters,
} = shopSlice.actions;

export default shopSlice.reducer;