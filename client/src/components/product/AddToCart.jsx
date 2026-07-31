import { FiShoppingCart } from "react-icons/fi";

const AddToCart = ({
  selectedVariant,
  loading,
  onAddToCart,
}) => {
  return (
    <button
      type="button"
      onClick={onAddToCart}
      disabled={
        !selectedVariant ||
        selectedVariant.stock === 0 ||
        loading
      }
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      <FiShoppingCart size={18} />

      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCart;