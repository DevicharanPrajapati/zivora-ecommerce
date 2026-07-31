const ShopSidebar = () => {
  return (
    <aside className="hidden lg:block border rounded-xl p-6 h-fit">
      <h2 className="text-xl font-semibold mb-6">
        Filters
      </h2>

      <div>
        <h3 className="font-medium mb-3">
          Categories
        </h3>

        <ul className="space-y-2">
          <li>All</li>
          <li>Men</li>
          <li>Women</li>
          <li>Kids</li>
        </ul>
      </div>
    </aside>
  );
};

export default ShopSidebar;