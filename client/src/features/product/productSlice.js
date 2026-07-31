import { createSlice } from "@reduxjs/toolkit";

import {
  fetchProductsThunk,
  fetchFeaturedProductsThunk,
  fetchProductByIdThunk,
  fetchProductsByCategoryThunk,
  fetchProductsByGenderThunk,
  fetchRelatedProductsThunk,
  searchProductsThunk,
} from "./productThunks";

const initialState = {
  products: [],
  featuredProducts: [],
  categoryProducts: [],
  genderProducts: [],
  relatedProducts: [],
  searchResults: [],
  selectedProduct: null,

  total: 0,
  page: 1,
  limit: 12,
  totalPages: 1,

  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },

  extraReducers: (builder) => {
    builder;

    // ==============================
    // Fetch Products
    // ==============================
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==============================
    // Featured Products
    // ==============================
    builder
      .addCase(fetchFeaturedProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==============================
    // Product Details
    // ==============================
    builder
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==============================
    // Category Products
    // ==============================
    builder
      .addCase(fetchProductsByCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductsByCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==============================
    // Gender Products
    // ==============================
    builder
      .addCase(fetchProductsByGenderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByGenderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.genderProducts = action.payload;
      })
      .addCase(fetchProductsByGenderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==============================
    // Related Products
    // ==============================
    builder
      .addCase(fetchRelatedProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==============================
    // Search Products
    // ==============================
    builder
      .addCase(searchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct, clearSearchResults } =
  productSlice.actions;

export default productSlice.reducer;
