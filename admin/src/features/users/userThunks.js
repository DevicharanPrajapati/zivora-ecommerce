import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  getUserById,
  updateUserRole,
} from "../users/userApi";

// Fetch all users
export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await getUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch single user
export const fetchUserByIdThunk = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserById(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user role
export const updateUserRoleThunk = createAsyncThunk(
  "users/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      return await updateUserRole(userId, role);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);