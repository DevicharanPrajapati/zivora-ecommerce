const EmptyProducts = () => {
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold">
        No Products Found
      </h2>

      <p className="text-gray-500 mt-2">
        Try changing your filters.
      </p>
    </div>
  );
};

export default EmptyProducts;