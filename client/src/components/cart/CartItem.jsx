import { useDispatch } from "react-redux";
import {
  updateQuantityThunk,
  removeCartItemThunk,
} from "../../features/cart/cartThunks";

const CartItem = ({ item, userId }) => {
  const dispatch = useDispatch();

  const product = item.products || item;

  const image =
    product.product_images?.find((img) => img.is_primary)?.image_url ||
    product.product_images?.[0]?.image_url ||
    "https://via.placeholder.com/150x180?text=No+Image";

  return (
    <div className="flex gap-5 border rounded-xl p-4 shadow-sm">
      {/* Product Image */}
      <img
        src={image}
        alt={product.title}
        className="w-28 h-32 object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{product.title}</h2>

        <p className="text-gray-500 mt-1">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={() =>
              item.quantity > 1 &&
              dispatch(
                updateQuantityThunk({
                  cartId: item.id,
                  quantity: item.quantity - 1,
                  userId,
                })
              )
            }
            className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300"
          >
            -
          </button>

          <span className="font-medium">{item.quantity}</span>

          <button
            onClick={() =>
              dispatch(
                updateQuantityThunk({
                  cartId: item.id,
                  quantity: item.quantity + 1,
                  userId,
                })
              )
            }
            className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() =>
          dispatch(
            removeCartItemThunk({
              cartId: item.id,
              userId,
            })
          )
        }
        className="text-red-500 font-semibold hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;