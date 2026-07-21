import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../../features/product/productThunks";
import ProductTable from "../../components/product/ProductTable";

const ProductsPage = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage all products
          </p>
        </div>

        <Link
          to="/products/add"
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </Link>

      </div>

      {/* Table */}

      <ProductTable
        products={products}
        loading={loading.fetch}
      />

    </div>
  );
};

export default ProductsPage;