import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProductByIdThunk } from "../features/product/productThunks";
import { addToCartThunk } from "../features/cart/cartThunks";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import VariantSelector from "../components/product/VariantSelector";
import ProductActions from "../components/product/ProductActions";

const ProductPage = () => {
  const { id } = useParams();
  // console.log("Route param id:", id);
  const dispatch = useDispatch();

  const {
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.product);

  const { user } = useSelector((state) => state.auth);
  const { loading: cartLoading } = useSelector((state) => state.cart);

  const [activeImage, setActiveImage] = useState(0);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductByIdThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    setSelectedColor("");
    setSelectedSize("");
    setQuantity(1);
    setActiveImage(0);
  }, [product]);

  const images = useMemo(() => {
    if (!product) return [];

    return [...product.product_images]
      .sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
      .map((img) => img.image_url);
  }, [product]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;

    return product.product_variants.find(
      (variant) =>
        variant.color_name === selectedColor && variant.size === selectedSize,
    );
  }, [product, selectedColor, selectedSize]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!selectedVariant) {
      alert("Please select a color and size.");
      return;
    }

    dispatch(
      addToCartThunk({
        userId: user.id,
        productId: product.id,
        variantId: selectedVariant.id,
        quantity,
      }),
    );
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!product) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-12 md:grid-cols-2">
        <ProductGallery
          images={images}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          productTitle={product.title}
        />

        <div>
          <ProductInfo product={product} />

          <VariantSelector
            variants={product.product_variants}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={(color) => {
              setSelectedColor(color);
              setSelectedSize("");
              setQuantity(1);
            }}
            onSizeChange={(size) => {
              setSelectedSize(size);
              setQuantity(1);
            }}
          />

          <ProductActions
            selectedVariant={selectedVariant}
            quantity={quantity}
            setQuantity={setQuantity}
            loading={cartLoading}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
