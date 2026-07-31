import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { placeOrderThunk } from "../../features/order/orderThunks";

const OrderSummary = ({
  selectedAddress,
  paymentMethod,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { placingOrder } = useSelector((state) => state.order);

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.products.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a shipping address.");
      return;
    }

    try {
      const order = await dispatch(
        placeOrderThunk({
          userId: user.id,
          addressId: selectedAddress.id,
          paymentMethod,
        })
      ).unwrap();

      navigate(`/order-success/${order.id}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-5">
        Order Summary
      </h2>

      {items.map((item) => {
        const image =
          item.products.product_images.find(
            (img) => img.is_primary
          )?.image_url ||
          item.products.product_images[0]?.image_url;

        return (
          <div
            key={item.id}
            className="flex gap-4 mb-5"
          >
            <img
              src={image}
              alt={item.products.title}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h3 className="font-medium">
                {item.products.title}
              </h3>

              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-semibold">
              ₹{Number(item.products.price) * item.quantity}
            </p>
          </div>
        );
      })}

      <hr className="my-5" />

      <div className="space-y-2 text-sm mb-5">
        <div className="flex justify-between">
          <span>Payment</span>
          <span>{paymentMethod}</span>
        </div>

        {selectedAddress && (
          <div>
            <p className="font-medium mb-1">
              Deliver To
            </p>

            <p className="text-gray-600">
              {selectedAddress.full_name}
            </p>

            <p className="text-gray-600">
              {selectedAddress.address_line_1}
            </p>

            {selectedAddress.address_line_2 && (
              <p className="text-gray-600">
                {selectedAddress.address_line_2}
              </p>
            )}

            <p className="text-gray-600">
              {selectedAddress.city}, {selectedAddress.state}
            </p>

            <p className="text-gray-600">
              {selectedAddress.postal_code}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>₹{subtotal}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={placingOrder}
        className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 disabled:bg-gray-400"
      >
        {placingOrder
          ? "Placing Order..."
          : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;