// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// import { fetchShopProducts } from "../features/product/productThunks";

// import ShopSidebar from "../components/shop/ShopSidebar";
// import ShopHeader from "../components/shop/ShopHeader";
// import ProductGrid from "../components/shop/ProductGrid";
// import ProductSkeleton from "../components/shop/ProductSkeleton";
// import EmptyProducts from "../components/shop/EmptyProducts";

// const ShopPage = () => {
//   const dispatch = useDispatch();
//   const [searchParams] = useSearchParams();

//   const { shopProducts, loading } = useSelector(
//     (state) => state.product
//   );
// console.log(shopProducts)
//   useEffect(() => {
//     dispatch(
//       fetchShopProducts({
//         category: searchParams.get("category"),
//         minPrice: searchParams.get("minPrice"),
//         maxPrice: searchParams.get("maxPrice"),
//         sort: searchParams.get("sort"),
//       })
//     );
//   }, [dispatch, searchParams]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid lg:grid-cols-4 gap-8">
//         <ShopSidebar />

//         <div className="lg:col-span-3">
//           <ShopHeader count={shopProducts.length} />

//           {loading ? (
//             <ProductSkeleton />
//           ) : shopProducts.length === 0 ? (
//             <EmptyProducts />
//           ) : (
//             <ProductGrid products={shopProducts} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopPage;