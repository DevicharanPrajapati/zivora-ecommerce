import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoryApi";

// Fetch Categories
export const fetchCategoriesThunk = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Category
export const createCategoryThunk = createAsyncThunk(
  "category/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      return await createCategory(categoryData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Category
export const updateCategoryThunk = createAsyncThunk(
  "category/updateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      return await updateCategory(id, categoryData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Category
export const deleteCategoryThunk = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);