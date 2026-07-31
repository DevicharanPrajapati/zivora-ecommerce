const CategoryHeader = ({ category, total }) => {
  return (
    <div className="mb-8">

      <p className="text-sm text-gray-500">
        Home / {category}
      </p>

      <h1 className="text-4xl font-bold capitalize mt-2">
        {category}
      </h1>

      <p className="text-gray-600 mt-2">
        {total} Products
      </p>

    </div>
  );
};

export default CategoryHeader;