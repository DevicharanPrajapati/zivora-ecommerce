const ProductGallery = ({
  images = [],
  activeImage,
  setActiveImage,
  productTitle,
}) => {
  if (!images.length) return null;

  return (
    <div>
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
        <img
          src={images[activeImage]}
          alt={productTitle}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition ${
                activeImage === index
                  ? "border-blue-600"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <img
                src={image}
                alt={`${productTitle}-${index}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;