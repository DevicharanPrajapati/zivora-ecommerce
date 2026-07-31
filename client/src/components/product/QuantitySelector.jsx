const QuantitySelector = ({
  quantity,
  setQuantity,
  selectedVariant,
}) => {
  const stock = selectedVariant?.stock ?? 0;

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-gray-800">
        Quantity
      </h3>

      <div className="flex w-fit items-center rounded-lg border border-gray-300">
        <button
          type="button"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          disabled={!selectedVariant}
          className="px-4 py-2 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          −
        </button>

        <span className="min-w-12 text-center font-medium">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() =>
            setQuantity((prev) => Math.min(stock, prev + 1))
          }
          disabled={!selectedVariant || quantity >= stock}
          className="px-4 py-2 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;