import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

const CartSummary = () => {
  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.products?.price || 0) * Number(item.quantity || 0),
    0
  );

  return (
    <div className="sticky top-24 h-fit rounded-xl border p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

      <div className="mb-4 flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString("en-IN")}</span>
      </div>

      <div className="mb-4 flex justify-between">
        <span>Shipping</span>
        <span className="text-green-600">Free</span>
      </div>

      <hr className="my-5" />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>₹{subtotal.toLocaleString("en-IN")}</span>
      </div>
    <Link
    to="/checkout"
    >
      <button className="mt-6 w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-900">
        Proceed to Checkout
      </button>
      </Link>
    </div>
  );
};

export default CartSummary;