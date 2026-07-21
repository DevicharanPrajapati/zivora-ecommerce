import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductVariantsThunk,
  createVariantThunk,
  deleteVariantThunk,
} from "../../features/productVariant/productVariantThunks";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductVariantForm = ({ productId }) => {
  const dispatch = useDispatch();

  const { variants, loading } = useSelector(
    (state) => state.productVariant
  );

  const [variant, setVariant] = useState({
    color_name: "",
    color_hex: "#000000",
    size: "M",
    stock: 0,
    sku: "",
  });

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductVariantsThunk(productId));
    }
  }, [dispatch, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVariant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createVariantThunk({
        product_id: productId,
        ...variant,
      })
    );

    setVariant({
      color_name: "",
      color_hex: "#000000",
      size: "M",
      stock: 0,
      sku: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">

      <h2 className="text-xl font-semibold">
        Product Variants
      </h2>

      {/* Add Variant */}

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-5 gap-4"
      >
        <input
          type="text"
          name="color_name"
          placeholder="Color"
          value={variant.color_name}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />

        <input
          type="color"
          name="color_hex"
          value={variant.color_hex}
          onChange={handleChange}
          className="h-11"
        />

        <select
          name="size"
          value={variant.size}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          {SIZES.map((size) => (
            <option key={size}>
              {size}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={variant.stock}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={variant.sku}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading.create}
          className="bg-black text-white rounded-lg py-2 md:col-span-5"
        >
          {loading.create ? "Adding..." : "Add Variant"}
        </button>
      </form>

      {/* Variant List */}

      {variants.length === 0 ? (
        <div className="text-gray-500 text-center py-10 border rounded-lg">
          No variants added yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">

            <thead className="bg-gray-100">
              <tr>

                <th className="p-3 text-left">
                  Color
                </th>

                <th className="p-3">
                  Size
                </th>

                <th className="p-3">
                  Stock
                </th>

                <th className="p-3">
                  SKU
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {variants.map((variant) => (
                <tr
                  key={variant.id}
                  className="border-t"
                >

                  <td className="p-3">
                    <div className="flex items-center gap-2">

                      <span
                        className="w-5 h-5 rounded-full border"
                        style={{
                          background: variant.color_hex,
                        }}
                      />

                      {variant.color_name}

                    </div>
                  </td>

                  <td className="text-center">
                    {variant.size}
                  </td>

                  <td className="text-center">
                    {variant.stock}
                  </td>

                  <td className="text-center">
                    {variant.sku}
                  </td>

                  <td className="text-center">

                    <button
                      onClick={() =>
                        dispatch(
                          deleteVariantThunk(
                            variant.id
                          )
                        )
                      }
                      className="text-red-500"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ProductVariantForm;