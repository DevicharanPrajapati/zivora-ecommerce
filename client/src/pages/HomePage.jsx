import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  fetchProductsThunk,
  fetchFeaturedProductsThunk,
} from "../features/product/productThunks";

import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import HeroSlider from "../components/home/HeroSlider";
import NewArrivals from "../components/home/NewArrivals";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk());
    dispatch(fetchFeaturedProductsThunk());
  }, [dispatch]);

  return (
    <main className="space-y-10">
      <HeroSlider />

      <section className="container mx-auto px-4">
        <CategorySection />
        <NewArrivals />
        <FeaturedProducts />
      </section>
    </main>
  );
};

export default HomePage;