import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentOrders from "../../components/dashboard/RecentOrders";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getDashboardStatsThunk,
  getRecentOrdersThunk,
} from "../../features/dashboard/dashboardThunks";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardStatsThunk());
    dispatch(getRecentOrdersThunk());
  }, [dispatch]);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500 mt-1">Welcome to the Admin Dashboard</p>
      </div>

      <StatsGrid />

      <RecentOrders />
    </div>
  );
};

export default AdminDashboard;
