import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductById,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
  fetchProductImages,
  uploadProductImageThunk,
  deleteProductImageThunk,
  setPrimaryImageThunk,
} from "./productThunks";

const initialState = {
  products: [],
  product: null,
  images: [],

  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
    uploadImage: false,
  },

  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Product
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      })

      // Create
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      // Update
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }

        state.product = action.payload;
      })

      // Delete
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p.id !== action.payload
        );
      })

      // Images
      .addCase(fetchProductImages.fulfilled, (state, action) => {
        state.images = action.payload;
      })

      .addCase(uploadProductImageThunk.fulfilled, (state, action) => {
        state.images.push(action.payload);
      })

      .addCase(deleteProductImageThunk.fulfilled, (state, action) => {
        state.images = state.images.filter(
          (img) => img.id !== action.payload
        );
      })

      .addCase(setPrimaryImageThunk.fulfilled, (state, action) => {
        state.images = state.images.map((img) => ({
          ...img,
          is_primary: img.id === action.payload.id,
        }));
      });
  },
});

export default productSlice.reducer;