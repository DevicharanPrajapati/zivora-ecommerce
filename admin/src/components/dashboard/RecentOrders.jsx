import { useSelector } from "react-redux";

const RecentOrders = () => {
  const { recentOrders } = useSelector((state) => state.dashboard);

  return (
    <div className="bg-white rounded-xl shadow-sm border mt-8">
      <div className="p-5 border-b">
        <h2 className="text-xl font-semibold">
          Recent Orders
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Payment</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  {order.profiles?.fullName}
                </td>

                <td className="p-4">
                  ₹{Number(order.total_amount).toLocaleString()}
                </td>

                <td className="p-4 capitalize">
                  {order.payment_status}
                </td>

                <td className="p-4 capitalize">
                  {order.order_status}
                </td>

                <td className="p-4">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {recentOrders.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8 text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;