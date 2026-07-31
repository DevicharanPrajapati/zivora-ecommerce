import { useMemo } from "react";
import { useSelector } from "react-redux";

import ProductCard from "../common/ProductCard";

const NewArrivals = () => {
  const { products, loading } = useSelector((state) => state.product);

  const newArrivals = useMemo(() => {
    return [...products]
      .sort(
        (a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
      )
      .slice(0, 8);
  }, [products]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">
          New Arrivals
        </h2>

        <p className="mt-2 text-gray-500">
          Discover our latest collection
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {newArrivals.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;