import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchOrderByIdThunk,
  updateOrderStatusThunk,
  updatePaymentStatusThunk,
} from "../../features/order/orderThunks";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedOrder, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrderByIdThunk(id));
  }, [dispatch, id]);

  const handleOrderStatus = (e) => {
    dispatch(
      updateOrderStatusThunk({
        orderId: id,
        status: e.target.value,
      })
    );
  };

  const handlePaymentStatus = (e) => {
    dispatch(
      updatePaymentStatusThunk({
        orderId: id,
        status: e.target.value,
      })
    );
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!selectedOrder) return null;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Order #{selectedOrder.id.slice(0, 8)}
      </h1>

      {/* Customer */}

      <div className="rounded-lg border bg-white p-6">

        <h2 className="mb-4 text-lg font-semibold">
          Customer
        </h2>

        <p>{selectedOrder.profiles?.full_name}</p>

        <p>{selectedOrder.profiles?.email}</p>

      </div>

      {/* Address */}

      <div className="rounded-lg border bg-white p-6">

        <h2 className="mb-4 text-lg font-semibold">
          Shipping Address
        </h2>

        <p>{selectedOrder.addresses?.full_name}</p>

        <p>{selectedOrder.addresses?.phone}</p>

        <p>{selectedOrder.addresses?.address_line_1}</p>

        {selectedOrder.addresses?.address_line_2 && (
          <p>{selectedOrder.addresses.address_line_2}</p>
        )}

        <p>
          {selectedOrder.addresses?.city},{" "}
          {selectedOrder.addresses?.state}
        </p>

        <p>{selectedOrder.addresses?.postal_code}</p>

        <p>{selectedOrder.addresses?.country}</p>

      </div>

      {/* Status */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-lg border bg-white p-6">

          <h2 className="mb-3 font-semibold">
            Order Status
          </h2>

          <select
            value={selectedOrder.order_status}
            onChange={handleOrderStatus}
            className="w-full rounded border p-2"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

        </div>

        <div className="rounded-lg border bg-white p-6">

          <h2 className="mb-3 font-semibold">
            Payment Status
          </h2>

          <select
            value={selectedOrder.payment_status}
            onChange={handlePaymentStatus}
            className="w-full rounded border p-2"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>

        </div>

      </div>

      {/* Products */}

      <div className="rounded-lg border bg-white p-6">

        <h2 className="mb-4 text-lg font-semibold">
          Order Items
        </h2>

        <div className="space-y-4">

          {selectedOrder.order_items.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >

              <img
                src={item.product_image}
                alt={item.product_title}
                className="h-20 w-20 rounded object-cover"
              />

              <div className="flex-1">

                <h3 className="font-medium">
                  {item.product_title}
                </h3>

                <p className="text-sm text-gray-500">
                  Qty : {item.quantity}
                </p>

              </div>

              <div className="text-right">

                <p>
                  ₹{item.price}
                </p>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default OrderDetailsPage;