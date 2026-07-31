import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { fetchCartThunk } from "../features/cart/cartThunks";

const CartPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartThunk(user.id));
    }
  }, [dispatch, user?.id]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Please Login
        </h1>
        <p className="text-gray-500">
          Login to view your shopping cart.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">
          Loading Cart...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl text-red-500">
          {error}
        </h1>
      </div>
    );
  }
// console.log("Cart Items:", items);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to your cart.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                userId={user.id}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;