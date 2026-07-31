const ShopSidebar = () => {
  return (
    <aside className="hidden lg:block border rounded-xl p-6 h-fit sticky top-24">
      <h2 className="text-xl font-bold mb-6">
        Filters
      </h2>

      <div>
        <h3 className="font-semibold mb-4">
          Category
        </h3>

        <ul className="space-y-3">
          <li className="cursor-pointer hover:text-black text-gray-600">
            All
          </li>

          <li className="cursor-pointer hover:text-black text-gray-600">
            Men
          </li>

          <li className="cursor-pointer hover:text-black text-gray-600">
            Women
          </li>

          <li className="cursor-pointer hover:text-black text-gray-600">
            Kids
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ShopSidebar; 