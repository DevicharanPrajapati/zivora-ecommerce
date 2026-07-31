const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse"
        >
          <div className="bg-gray-200 h-64 rounded-xl"></div>

          <div className="bg-gray-200 h-5 rounded mt-4"></div>

          <div className="bg-gray-200 h-5 rounded w-1/2 mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;