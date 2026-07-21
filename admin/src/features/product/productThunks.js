import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./productAPI";

/* ===========================
   GET ALL PRODUCTS
=========================== */
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getProducts();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ===========================
   GET SINGLE PRODUCT
=========================== */
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      return await api.getProductById(productId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ===========================
   CREATE PRODUCT
=========================== */
export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      return await api.createProduct(productData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ===========================
   UPDATE PRODUCT
=========================== */
export const updateProductThunk = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      return await api.updateProduct(productId, productData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ===========================
   DELETE PRODUCT
=========================== */
export const deleteProductThunk = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await api.deleteProduct(productId);
      console.log("Thunk called", productId);

      return productId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ===========================
   GET PRODUCT IMAGES
=========================== */
export const fetchProductImages = createAsyncThunk(
  "product/fetchProductImages",
  async (productId, { rejectWithValue }) => {
    try {
      return await api.getProductImages(productId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ===========================
   UPLOAD IMAGE
=========================== */
export const uploadProductImageThunk = createAsyncThunk(
  "product/uploadProductImage",
  async ({ productId, file, isPrimary }, { rejectWithValue }) => {
    try {
      const imageUrl = await api.uploadImageToStorage(file);

      return await api.uploadProductImage(productId, imageUrl, isPrimary);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ===========================
   DELETE IMAGE
=========================== */
export const deleteProductImageThunk = createAsyncThunk(
  "product/deleteProductImage",
  async (imageId, { rejectWithValue }) => {
    try {
      await api.deleteProductImage(imageId);
      return imageId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ===========================
   SET PRIMARY IMAGE
=========================== */
export const setPrimaryImageThunk = createAsyncThunk(
  "product/setPrimaryImage",
  async ({ productId, imageId }, { rejectWithValue }) => {
    try {
      return await api.setPrimaryImage(productId, imageId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
