import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import categoryReducer from "../features/category/categorySlice";
import orderReducer from "../features/order/orderSlice";
import addressReducer from "../features/address/addressSlice"
import shopReducer from "../features/shop/shopSlice";


export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    category: categoryReducer,
    order: orderReducer,
    address: addressReducer,
     shop: shopReducer,
  },
});
