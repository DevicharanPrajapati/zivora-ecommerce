const ProductInfo = ({ product }) => {
  if (!product) return null;

  return (
    <div>
      {/* Category */}
      {product.categories && (
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          {product.categories.name}
        </p>
      )}

      {/* Product Title */}
      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        {product.title}
      </h1>

      {/* Price */}
      <div className="mt-4">
        <span className="text-3xl font-bold text-blue-600">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <p className="mt-6 leading-relaxed text-gray-600">
          {product.description}
        </p>
      )}
    </div>
  );
};

export default ProductInfo;