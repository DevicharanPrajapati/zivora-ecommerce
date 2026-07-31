import { useDispatch } from "react-redux";
import { SearchX } from "lucide-react";

import { clearFilters } from "../../features/shop/shopSlice";

const EmptyProducts = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100">
        <SearchX className="w-10 h-10 text-gray-500" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        No Products Found
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        We couldn't find any products matching your current filters. Try
        changing your search or clear all filters.
      </p>

      <button
        onClick={() => dispatch(clearFilters())}
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EmptyProducts;