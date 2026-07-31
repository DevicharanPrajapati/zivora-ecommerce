import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProducts,
  getFeaturedProducts,
  getProductById,
  getProductsByCategory,
  getProductsByGender,
  getRelatedProducts,
  searchProducts,
} from "../product/productAPI";

// Get all products
export const fetchProductsThunk = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await getProducts(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get featured products
export const fetchFeaturedProductsThunk = createAsyncThunk(
  "product/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await getFeaturedProducts();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get single product
export const fetchProductByIdThunk = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    // console.log("Thunk received:", productId);
    try {
      return await getProductById(productId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get products by category
export const fetchProductsByCategoryThunk = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (slug, { rejectWithValue }) => {
    try {
      return await getProductsByCategory(slug);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get products by gender
export const fetchProductsByGenderThunk = createAsyncThunk(
  "product/fetchProductsByGender",
  async (gender, { rejectWithValue }) => {
    try {
      return await getProductsByGender(gender);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get related products
export const fetchRelatedProductsThunk = createAsyncThunk(
  "product/fetchRelatedProducts",
  async ({ categoryId, productId }, { rejectWithValue }) => {
    try {
      return await getRelatedProducts(categoryId, productId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Search products
export const searchProductsThunk = createAsyncThunk(
  "product/searchProducts",
  async (keyword, { rejectWithValue }) => {
    try {
      return await searchProducts(keyword);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);