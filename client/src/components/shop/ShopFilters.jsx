import { useSelector, useDispatch } from "react-redux";

import {
  setSearch,
  setCategory,
  setGender,
  setSort,
} from "../../features/shop/shopSlice";

const ShopFilters = () => {
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => state.shop);
  const { categories } = useSelector((state) => state.category);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Search
          </label>

          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category
          </label>

          <select
            value={filters.category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Gender
          </label>

          <select
            value={filters.gender}
            onChange={(e) => dispatch(setGender(e.target.value))}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sort By
          </label>

          <select
            value={filters.sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="a-z">Name: A-Z</option>
            <option value="z-a">Name: Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;