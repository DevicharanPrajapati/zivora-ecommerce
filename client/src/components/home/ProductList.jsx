import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductsThunk } from "../../features/product/productThunks";

import ProductCard from "../common/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-10 text-center">
        No products found.
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Latest Products</h2>
        <p className="mt-2 text-gray-500">
          Explore our newest arrivals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;