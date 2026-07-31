import SortDropdown from "./SortDropdown";

const ShopHeader = ({ count }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold">
        {count} Products
      </h2>

      <SortDropdown />
    </div>
  );
};

export default ShopHeader;