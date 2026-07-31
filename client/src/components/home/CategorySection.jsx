import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCategories } from "../../features/category/categoryThunk";

const CategorySection = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.category,
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-3xl font-bold">Shop by Category</h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
        <p className="mt-2 text-gray-500">
          Discover your favorite styles.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="group overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="h-60 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;