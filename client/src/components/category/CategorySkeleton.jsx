const CategorySkeleton = () => {
  return (
    <div className="animate-pulse p-2">

      <div className="h-8 w-52 bg-gray-200 rounded mb-6"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border p-4"
          >
            <div className="h-52 bg-gray-200 rounded"></div>

            <div className="h-4 bg-gray-200 rounded mt-4"></div>

            <div className="h-4 w-20 bg-gray-200 rounded mt-3"></div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default CategorySkeleton;