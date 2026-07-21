import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./productVariantApi";

/* ===========================
   GET PRODUCT VARIANTS
=========================== */
export const fetchProductVariantsThunk = createAsyncThunk(
  "productVariant/fetchProductVariants",
  async (productId, { rejectWithValue }) => {
    try {
      return await api.getProductVariants(productId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   GET SINGLE VARIANT
=========================== */
export const fetchVariantByIdThunk = createAsyncThunk(
  "productVariant/fetchVariantById",
  async (variantId, { rejectWithValue }) => {
    try {
      return await api.getVariantById(variantId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   CREATE VARIANT
=========================== */
export const createVariantThunk = createAsyncThunk(
  "productVariant/createVariant",
  async (variantData, { rejectWithValue }) => {
    try {
      return await api.createVariant(variantData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   UPDATE VARIANT
=========================== */
export const updateVariantThunk = createAsyncThunk(
  "productVariant/updateVariant",
  async ({ variantId, variantData }, { rejectWithValue }) => {
    try {
      return await api.updateVariant(variantId, variantData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   DELETE VARIANT
=========================== */
export const deleteVariantThunk = createAsyncThunk(
  "productVariant/deleteVariant",
  async (variantId, { rejectWithValue }) => {
    try {
      return await api.deleteVariant(variantId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);