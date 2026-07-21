import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductVariantsThunk,
  fetchVariantByIdThunk,
  createVariantThunk,
  updateVariantThunk,
  deleteVariantThunk,
} from "./productVariantThunks";

const initialState = {
  variants: [],
  variant: null,

  loading: {
    fetch: false,
    fetchOne: false,
    create: false,
    update: false,
    delete: false,
  },

  error: {
    fetch: null,
    fetchOne: null,
    create: null,
    update: null,
    delete: null,
  },
};

const productVariantSlice = createSlice({
  name: "productVariant",
  initialState,
  reducers: {
    clearCurrentVariant(state) {
      state.variant = null;
    },

    clearVariantErrors(state) {
      Object.keys(state.error).forEach((key) => {
        state.error[key] = null;
      });
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===========================
         FETCH VARIANTS
      =========================== */
      .addCase(fetchProductVariantsThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchProductVariantsThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.variants = action.payload;
      })
      .addCase(fetchProductVariantsThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload;
      })

      /* ===========================
         FETCH SINGLE VARIANT
      =========================== */
      .addCase(fetchVariantByIdThunk.pending, (state) => {
        state.loading.fetchOne = true;
        state.error.fetchOne = null;
      })
      .addCase(fetchVariantByIdThunk.fulfilled, (state, action) => {
        state.loading.fetchOne = false;
        state.variant = action.payload;
      })
      .addCase(fetchVariantByIdThunk.rejected, (state, action) => {
        state.loading.fetchOne = false;
        state.error.fetchOne = action.payload;
      })

      /* ===========================
         CREATE VARIANT
      =========================== */
      .addCase(createVariantThunk.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createVariantThunk.fulfilled, (state, action) => {
        state.loading.create = false;
        state.variants.push(action.payload);
      })
      .addCase(createVariantThunk.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
      })

      /* ===========================
         UPDATE VARIANT
      =========================== */
      .addCase(updateVariantThunk.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateVariantThunk.fulfilled, (state, action) => {
        state.loading.update = false;

        const index = state.variants.findIndex(
          (variant) => variant.id === action.payload.id
        );

        if (index !== -1) {
          state.variants[index] = action.payload;
        }

        if (state.variant?.id === action.payload.id) {
          state.variant = action.payload;
        }
      })
      .addCase(updateVariantThunk.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
      })

      /* ===========================
         DELETE VARIANT
      =========================== */
      .addCase(deleteVariantThunk.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteVariantThunk.fulfilled, (state, action) => {
        state.loading.delete = false;

        state.variants = state.variants.filter(
          (variant) => variant.id !== action.payload
        );

        if (state.variant?.id === action.payload) {
          state.variant = null;
        }
      })
      .addCase(deleteVariantThunk.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      });
  },
});

export const {
  clearCurrentVariant,
  clearVariantErrors,
} = productVariantSlice.actions;

export default productVariantSlice.reducer;