import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/AdminDashboard";
import ProductsPage from "../pages/products/ProductsPage";
import AddProductPage from "../pages/products/AddProductPage";
import EditProductPage from "../pages/products/EditeProductPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import OrdersPage from "../pages/orders/OrdersPage";
import UsersPage from "../pages/users/UsersPage";

import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Products */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/add" element={<AddProductPage />} />
          <Route path="/products/edit/:id" element={<EditProductPage />} />

          {/* Other Modules */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoutes;