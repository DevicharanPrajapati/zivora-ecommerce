import { useSelector } from "react-redux";

import ProductCard from "../common/ProductCard";

const FeaturedProducts = () => {
  const { featuredProducts, loading, error } = useSelector(
    (state) => state.product
  );

  if (loading) {
    return (
      <section className="py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>
          <p className="mt-2 text-gray-500">
            Hand-picked products just for you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-10 text-center">
        <h2 className="text-3xl font-bold">
          Featured Products
        </h2>
        <p className="mt-4 text-gray-500">
          No featured products available.
        </p>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>
          <p className="mt-2 text-gray-500">
            Hand-picked products just for you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;