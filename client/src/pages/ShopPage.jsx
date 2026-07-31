import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchShopProductsThunk } from "../features/shop/shopThunks";

import ShopFilters from "../components/shop/ShopFilters";
import ShopToolbar from "../components/shop/ShopToolbar";
import ProductGrid from "../components/shop/ProductGrid";

const ShopPage = () => {
  const dispatch = useDispatch();

  const { products, loading, error, filters } = useSelector(
    (state) => state.shop
  );

  useEffect(() => {
    dispatch(fetchShopProductsThunk(filters));
  }, [dispatch, filters]);

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="mt-2 text-gray-500">
          Discover our latest collection.
        </p>
      </div>

      {/* Filters */}
      <ShopFilters />

      {/* Toolbar */}
      <ShopToolbar />

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Products */}
      <ProductGrid products={products} loading={loading} />
    </section>
  );
};

export default ShopPage;