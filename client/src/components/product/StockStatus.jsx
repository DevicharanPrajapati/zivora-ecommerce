const StockStatus = ({ selectedVariant }) => {
  if (!selectedVariant) {
    return (
      <p className="text-sm font-medium text-gray-500">
        Please select a color and size.
      </p>
    );
  }

  if (selectedVariant.stock === 0) {
    return (
      <p className="text-sm font-medium text-red-600">
        Out of Stock
      </p>
    );
  }

  if (selectedVariant.stock <= 5) {
    return (
      <p className="text-sm font-medium text-orange-600">
        Only {selectedVariant.stock} left
      </p>
    );
  }

  return (
    <p className="text-sm font-medium text-green-600">
      In Stock
    </p>
  );
};

export default StockStatus;