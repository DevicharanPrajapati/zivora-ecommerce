import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddressForm = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "India",
      address_type: "Home",
      is_default: false,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
      });
    }
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Full Name */}
      <div>
        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter full name"
          {...register("full_name", {
            required: "Full name is required",
          })}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {errors.full_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.full_name.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-2 font-medium">
          Phone Number
        </label>

        <input
          type="tel"
          placeholder="9876543210"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit phone number",
            },
          })}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Address Line 1 */}
      <div>
        <label className="block mb-2 font-medium">
          Address Line 1
        </label>

        <input
          type="text"
          placeholder="House No, Street"
          {...register("address_line_1", {
            required: "Address is required",
          })}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {errors.address_line_1 && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address_line_1.message}
          </p>
        )}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="block mb-2 font-medium">
          Address Line 2
        </label>

        <input
          type="text"
          placeholder="Apartment, Landmark (Optional)"
          {...register("address_line_2")}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* City & State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            City
          </label>

          <input
            type="text"
            {...register("city", {
              required: "City is required",
            })}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {errors.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            State
          </label>

          <input
            type="text"
            {...register("state", {
              required: "State is required",
            })}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {errors.state && (
            <p className="text-red-500 text-sm mt-1">
              {errors.state.message}
            </p>
          )}
        </div>
      </div>

      {/* Postal Code & Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            Postal Code
          </label>

          <input
            type="text"
            {...register("postal_code", {
              required: "Postal code is required",
            })}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {errors.postal_code && (
            <p className="text-red-500 text-sm mt-1">
              {errors.postal_code.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Country
          </label>

          <input
            type="text"
            {...register("country", {
              required: "Country is required",
            })}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      {/* Address Type */}
      <div>
        <label className="block mb-2 font-medium">
          Address Type
        </label>

        <select
          {...register("address_type")}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Default */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_default"
          {...register("is_default")}
        />

        <label htmlFor="is_default">
          Set as default address
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : initialValues
            ? "Update Address"
            : "Save Address"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;