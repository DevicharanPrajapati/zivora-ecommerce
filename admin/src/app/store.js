import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import productVariantReducer from "../features/productVariant/productVariantSlice";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice";
// import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    productVariant: productVariantReducer,
    product: productReducer,
    cart: cartReducer,
    category : categoryReducer,
    // order: orderReducer,
  },
});
