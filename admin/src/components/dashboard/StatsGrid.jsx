import {
  Package,
  LayoutGrid,
  ShoppingCart,
  Users,
  IndianRupee,
} from "lucide-react";

import { useSelector } from "react-redux";
import StatCard from "./StatCard";

const StatsGrid = () => {
  const { stats } = useSelector((state) => state.dashboard);
  // console.log("stats",stats);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
      <StatCard
        title="Products"
        value={stats.products}
        icon={<Package size={28} />}
        color="bg-blue-500"
      />

      <StatCard
        title="Categories"
        value={stats.categories}
        icon={<LayoutGrid size={28} />}
        color="bg-purple-500"
      />

      <StatCard
        title="Orders"
        value={stats.orders}
        icon={<ShoppingCart size={28} />}
        color="bg-orange-500"
      />

      <StatCard
        title="Customers"
        value={stats.customers}
        icon={<Users size={28} />}
        color="bg-green-500"
      />

      <StatCard
        title="Revenue"
        value={`₹${stats.revenue.toLocaleString()}`}
        icon={<IndianRupee size={28} />}
        color="bg-red-500"
      />
    </div>
  );
};

export default StatsGrid;