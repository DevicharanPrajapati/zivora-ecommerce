import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/category/categoryThunk";
import CategoryCard from "../components/category/CategoryCard";

const CategoriesPage = () => {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <h2 className="text-center py-20">Loading...</h2>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      <div className="text-center mb-12">

        <h1 className="text-5xl font-bold">
          Shop By Category
        </h1>

        <p className="text-gray-500 mt-3">
          Discover our latest collections.
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}

      </div>

    </section>
  );
};

export default CategoriesPage;