import { createAsyncThunk } from "@reduxjs/toolkit";
import * as addressAPI from "./addressAPI";

// =======================================================
// Fetch User Addresses
// =======================================================

export const fetchAddressesThunk = createAsyncThunk(
  "address/fetchAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      return await addressAPI.getUserAddresses(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =======================================================
// Fetch Address By Id
// =======================================================

export const fetchAddressByIdThunk = createAsyncThunk(
  "address/fetchAddressById",
  async (addressId, { rejectWithValue }) => {
    try {
      return await addressAPI.getAddressById(addressId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =======================================================
// Add Address
// =======================================================

export const addAddressThunk = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      return await addressAPI.addAddress(addressData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =======================================================
// Update Address
// =======================================================

export const updateAddressThunk = createAsyncThunk(
  "address/updateAddress",
  async ({ addressId, updates }, { rejectWithValue }) => {
    try {
      return await addressAPI.updateAddress(addressId, updates);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =======================================================
// Delete Address
// =======================================================

export const deleteAddressThunk = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      await addressAPI.deleteAddress(addressId);
      return addressId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// =======================================================
// Set Default Address
// =======================================================

export const setDefaultAddressThunk = createAsyncThunk(
  "address/setDefaultAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      return await addressAPI.setDefaultAddress(userId, addressId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);