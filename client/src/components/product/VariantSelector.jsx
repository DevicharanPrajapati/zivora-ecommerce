const VariantSelector = ({
  variants = [],
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) => {
  // Unique colors
  const colors = [
    ...new Map(
      variants.map((variant) => [variant.color_name, variant])
    ).values(),
  ];

  // Sizes for selected color
  const sizes = variants.filter(
    (variant) => variant.color_name === selectedColor
  );

  return (
    <div className="space-y-6">
      {/* Colors */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Color
        </h3>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.color_name}
              onClick={() => onColorChange(color.color_name)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition ${
                selectedColor === color.color_name
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {color.color_hex && (
                <span
                  className="h-5 w-5 rounded-full border"
                  style={{ backgroundColor: color.color_hex }}
                />
              )}

              <span>{color.color_name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      {selectedColor && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-800">
            Size
          </h3>

          <div className="flex flex-wrap gap-3">
            {sizes.map((variant) => (
              <button
                key={variant.id}
                onClick={() => onSizeChange(variant.size)}
                disabled={variant.stock === 0}
                className={`rounded-lg border px-4 py-2 transition ${
                  selectedSize === variant.size
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 hover:border-gray-400"
                } ${
                  variant.stock === 0
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : ""
                }`}
              >
                {variant.size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;