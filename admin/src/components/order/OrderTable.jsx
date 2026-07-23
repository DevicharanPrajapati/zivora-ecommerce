import { Link } from "react-router-dom";

const OrderTable = ({ orders }) => {
  if (!orders.length) {
    return (
      <div className="rounded-lg border bg-white p-10 text-center">
        <h2 className="text-lg font-semibold">No Orders Found</h2>
        <p className="mt-2 text-sm text-gray-500">
          Customer orders will appear here.
        </p>
      </div>
    );
  }

  const getOrderStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";

      case "confirmed":
        return "bg-blue-100 text-blue-800";

      case "processing":
        return "bg-indigo-100 text-indigo-800";

      case "shipped":
        return "bg-purple-100 text-purple-800";

      case "delivered":
        return "bg-green-100 text-green-800";

      case "cancelled":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusClasses = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";

      case "pending":
        return "bg-yellow-100 text-yellow-800";

      case "failed":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Order ID
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Customer
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Total
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Payment
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Order Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Date
              </th>

              <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                {/* Order ID */}
                <td className="px-6 py-4 text-sm font-medium">
                  #{order.id.slice(0, 8)}
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="font-medium">
                    {order.profiles?.fullName || "N/A"}
                  </div>

                  <div className="text-sm text-gray-500">
                    {order.profiles?.email}
                  </div>
                </td>

                {/* Total */}
                <td className="px-6 py-4 font-semibold">
                  ₹{Number(order.total_amount).toFixed(2)}
                </td>

                {/* Payment */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStatusClasses(
                      order.payment_status
                    )}`}
                  >
                    {order.payment_status}
                  </span>
                </td>

                {/* Order Status */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getOrderStatusClasses(
                      order.order_status
                    )}`}
                  >
                    {order.order_status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/orders/${order.id}`}
                    className="rounded-md bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;