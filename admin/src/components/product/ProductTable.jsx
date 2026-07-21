import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProductThunk } from "../../features/product/productThunks";

const ProductTable = ({ products, loading }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
     console.log("Delete clicked", id);
    if (!confirmed) return;

    dispatch(deleteProductThunk(id));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
        No products found.
      </div>
    );
  }
// console.log(products[0]);
// console.log(products[0].product_images);
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-center">Price</th>
            <th className="p-4 text-center">Gender</th>
            <th className="p-4 text-center">Featured</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t hover:bg-gray-50"
            >
              {/* Image */}
              <td className="p-4">
                <img
                  src={
                    product.product_images?.find(
                      (img) => img.is_primary
                    )?.image_url ||
                    product.product_images?.[0]?.image_url ||
                    "https://placehold.co/80x80"
                  }
                  alt={product.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </td>

              {/* Title */}
              <td className="p-4">
                <div>
                  <h3 className="font-semibold">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    ₹{Number(product.price).toLocaleString()}
                  </p>
                </div>
              </td>

              {/* Category */}
              <td className="p-4">
                {product.categories?.name || "-"}
              </td>

              {/* Price */}
              <td className="p-4 text-center">
                ₹{Number(product.price).toLocaleString()}
              </td>

              {/* Gender */}
              <td className="p-4 text-center">
                {product.gender}
              </td>

              {/* Featured */}
              <td className="p-4 text-center">
                {product.is_featured ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Yes
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    No
                  </span>
                )}
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-center gap-3">

                  <Link
                    to={`/products/edit/${product.id}`}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;