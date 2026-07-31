import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, X } from "lucide-react";

import AddressForm from "./AddressForm";

import {
  fetchAddressesThunk,
  addAddressThunk,
  updateAddressThunk,
  deleteAddressThunk,
} from "../../features/address/addressThunks";

import { Pencil, Trash2 } from "lucide-react";

const AddressSelector = ({ userId, selectedAddress, setSelectedAddress }) => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Update Address Handler
  const handleUpdateAddress = async (data) => {
    try {
      const updatedAddress = await dispatch(
        updateAddressThunk({
          addressId: editingAddress.id,
          updates: data,
        }),
      ).unwrap();

      const updated = await dispatch(fetchAddressesThunk(user.id)).unwrap();

      const latest =
        updated.find((a) => a.id === updatedAddress.id) || updated[0];

      setSelectedAddress(latest);

      setEditingAddress(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Address Handler
  const handleDeleteAddress = async (id) => {
    const confirmed = window.confirm("Delete this address?");

    if (!confirmed) return;

    try {
      const updated = await dispatch(fetchAddressesThunk(user.id)).unwrap();

      if (updated.length > 0) {
        const defaultAddress = updated.find((a) => a.is_default) || updated[0];

        setSelectedAddress(defaultAddress);
      } else {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const { addresses, loading } = useSelector((state) => state.address);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAddressesThunk(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress =
        addresses.find((a) => a.is_default) || addresses[0];

      setSelectedAddress(defaultAddress);
    }
  }, [addresses, selectedAddress, setSelectedAddress]);

  const handleAddAddress = async (data) => {
    try {
      const newAddress = await dispatch(
        addAddressThunk({
          ...data,
          user_id: user.id,
        }),
      ).unwrap();

      const updated = await dispatch(fetchAddressesThunk(user.id)).unwrap();

      const latest = updated.find((a) => a.id === newAddress.id) || updated[0];

      setSelectedAddress(latest);

      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Shipping Address</h2>

        {!showForm ? (
          <button
            onClick={() => {
              setEditingAddress(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={18} />
            Add Address
          </button>
        ) : (
          <button
            onClick={() => {
              setShowForm(false);
              setEditingAddress(null);
            }}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={18} />
            Cancel
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8 text-gray-500">
          Loading addresses...
        </div>
      )}

      {/* Empty */}
      {!loading && addresses.length === 0 && !showForm && (
        <div className="border rounded-xl p-8 text-center">
          <p className="text-gray-500 mb-4">No saved addresses found.</p>

          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Add Your First Address
          </button>
        </div>
      )}

      {/* Address List */}
      {!loading && addresses.length > 0 && (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              className={`border rounded-xl p-4 ${
                selectedAddress?.id === address.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex gap-3">
                <input
                  type="radio"
                  checked={selectedAddress?.id === address.id}
                  onChange={() => setSelectedAddress(address)}
                  className="mt-1"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{address.full_name}</h3>

                    <span className="text-xs border rounded-full px-2 py-1">
                      {address.address_type}
                    </span>

                    {address.is_default && (
                      <span className="text-xs bg-black text-white px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-2">{address.phone}</p>

                  <p className="text-sm text-gray-600">
                    {address.address_line_1}
                  </p>

                  {address.address_line_2 && (
                    <p className="text-sm text-gray-600">
                      {address.address_line_2}
                    </p>
                  )}

                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state}
                  </p>

                  <p className="text-sm text-gray-600">
                    {address.postal_code}, {address.country}
                  </p>

                  {/* We'll add Edit/Delete here later */}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();

                        setEditingAddress(address);
                        setShowForm(true);
                      }}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteAddress(address.id);
                      }}
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Address Form */}
      {showForm && (
        <div className="mt-8 border-t pt-8">
          <h3 className="text-lg font-semibold mb-5">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h3>

          <AddressForm
            initialValues={editingAddress}
            loading={loading}
            onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
            onCancel={() => {
              setShowForm(false);
              setEditingAddress(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
