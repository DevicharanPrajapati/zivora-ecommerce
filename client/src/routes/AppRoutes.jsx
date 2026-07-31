import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

// Authentication Pages
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

// Main Pages
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckOutPage";

// Category Pages
import CategoriesPage from "../pages/CatogoriesPage";
import CategoryPage from "../pages/CategoryPage";

// Order Pages
import SuccessOrderPage from "../pages/SuccessOrderPage";
import OrderPage from "../pages/OrderPage";

// Address
import AddressSelector from "../components/checkout/AddressSelector";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= Main Layout ================= */}
        <Route element={<MainLayout />}>

          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Product Routes */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductPage />} />

          {/* Category Routes */}
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />

          {/* Shopping Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Order Routes */}
          <Route
            path="/order-success/:orderId"
            element={<SuccessOrderPage />}
          />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/:orderId" element={<OrderPage />} />

          {/* Address Management */}
          <Route path="/addresses" element={<AddressSelector />} />

          {/* Future Shop Page */}
          {/* <Route path="/shop" element={<ShopPage />} /> */}
        </Route>

        {/* ================= Authentication ================= */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;