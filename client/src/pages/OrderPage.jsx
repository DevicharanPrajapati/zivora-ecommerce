import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrdersThunk } from "../features/order/orderThunks";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrdersThunk(user.id));
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-lg">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>

        <p className="text-gray-500 mb-6">
          Looks like you haven't placed any orders.
        </p>

        <Link
          to="/shop"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <p className="font-semibold">
                  Order #{order.id.slice(0, 8)}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>

                <p className="mt-2 capitalize">
                  Status:
                  <span className="font-medium ml-2">
                    {order.order_status}
                  </span>
                </p>

                <p className="capitalize">
                  Payment:
                  <span className="font-medium ml-2">
                    {order.payment_status}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <h2 className="text-xl font-bold">
                  ₹{Number(order.total_amount).toLocaleString()}
                </h2>

                <Link
                  to={`/orders/${order.id}`}
                  className="inline-block mt-4 border border-black px-5 py-2 rounded-lg hover:bg-black hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;