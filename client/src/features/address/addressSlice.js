import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddressesThunk,
  fetchAddressByIdThunk,
  addAddressThunk,
  updateAddressThunk,
  deleteAddressThunk,
  setDefaultAddressThunk,
} from "./addressThunks";

const initialState = {
  addresses: [],
  selectedAddress: null,

  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },

    clearAddressError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =======================================================
      // Fetch Addresses
      // =======================================================

      .addCase(fetchAddressesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddressesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =======================================================
      // Fetch Address By Id
      // =======================================================

      .addCase(fetchAddressByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAddress = action.payload;
      })
      .addCase(fetchAddressByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =======================================================
      // Add Address
      // =======================================================

      .addCase(addAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddressThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.unshift(action.payload);
      })
      .addCase(addAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =======================================================
      // Update Address
      // =======================================================

      .addCase(updateAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddressThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.addresses.findIndex(
          (address) => address.id === action.payload.id,
        );

        if (index !== -1) {
          state.addresses[index] = action.payload;
        }

        if (state.selectedAddress?.id === action.payload.id) {
          state.selectedAddress = action.payload;
        }
      })
      .addCase(updateAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =======================================================
      // Delete Address
      // =======================================================

      .addCase(deleteAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload,
        );

        if (state.selectedAddress?.id === action.payload) {
          state.selectedAddress = null;
        }
      })
      .addCase(deleteAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =======================================================
      // Set Default Address
      // =======================================================

      .addCase(setDefaultAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddressThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses = state.addresses.map((address) => ({
          ...address,
          is_default: address.id === action.payload.id,
        }));
      })
      .addCase(setDefaultAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedAddress, clearAddressError } =
  addressSlice.actions;

export default addressSlice.reducer;