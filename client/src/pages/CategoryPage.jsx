import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProductsByCategoryThunk } from "../features/product/productThunks";

import CategoryHeader from "../components/category/CategoryHeader";
import ProductGrid from "../components/category/ProductGrid";
import EmptyCategory from "../components/category/EmptyCategory";
import CategorySkeleton from "../components/category/CategorySkeleton";

const CategoryPage = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const {
    categoryProducts,
    loading,
    error,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductsByCategoryThunk(slug));
    }
  }, [dispatch, slug]);

  if (loading) {
    return <CategorySkeleton />;
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <CategoryHeader
        category={slug}
        total={categoryProducts.length}
      />

      {categoryProducts.length === 0 ? (
        <EmptyCategory />
      ) : (
        <ProductGrid products={categoryProducts} />
      )}
    </div>
  );
};

export default CategoryPage;