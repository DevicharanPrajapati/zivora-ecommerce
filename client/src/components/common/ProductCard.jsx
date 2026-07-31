import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const ProductCard = React.memo(({ product }) => {
  const {
    id,
    title,
    description,
    price,
    stock,
    product_images,
  } = product;

  const navigate = useNavigate();

  // Get primary image or first image
  const image =
    product_images?.find((img) => img.is_primary)?.image_url ||
    product_images?.[0]?.image_url ||
    "https://via.placeholder.com/600x800?text=No+Image";

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/wishlist");
  };

  return (
    <Link
      to={`/products/${id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-md bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-900">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h2 className="line-clamp-1 text-lg font-semibold text-gray-800">
          {title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ₹{Number(price).toLocaleString("en-IN")}
          </span>

          <button
            type="button"
            onClick={handleWishlistClick}
            className="text-gray-700 transition hover:text-red-500"
            aria-label="Add to wishlist"
          >
            <FiHeart size={20} />
          </button>
        </div>

        {stock > 0 ? (
          <span className="mt-2 block text-xs font-medium text-green-600">
            {stock <= 5 ? `Only ${stock} left` : "In Stock"}
          </span>
        ) : (
          <span className="mt-2 block text-xs font-medium text-red-600">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;