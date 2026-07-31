import { useDispatch, useSelector } from "react-redux";

import { setSort } from "../../features/shop/shopSlice";

const ShopToolbar = () => {
  const dispatch = useDispatch();

  const { products, filters } = useSelector((state) => state.shop);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      {/* Product Count */}
      <p className="text-gray-600">
        Showing <span className="font-semibold">{products.length}</span> products
      </p>

      {/* Sort */}
      <div className="flex items-center gap-3">
        <label className="font-medium">Sort By:</label>

        <select
          value={filters.sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="border rounded-md px-3 py-2"
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
  );
};

export default ShopToolbar;