const ProductSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 overflow-hidden bg-white">
      {/* Image */}
      <div className="h-72 w-full bg-gray-200"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>

        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>

        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>

        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-20 bg-gray-200 rounded"></div>

          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;