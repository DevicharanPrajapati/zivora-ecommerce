// src/admin/pages/OrdersPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrdersThunk } from "../../features/order/orderThunks";

import OrderTable from "../../components/order/OrderTable";

const OrdersPage = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-500">
            Manage customer orders
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Total Orders:{" "}
          <span className="font-semibold text-black">
            {orders.length}
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <OrderTable orders={orders} />
    </div>
  );
};

export default OrdersPage;