import StockStatus from "./StockStatus";
import QuantitySelector from "./QuantitySelector";
import AddToCart from "./AddToCart";

const ProductActions = ({
  selectedVariant,
  quantity,
  setQuantity,
  loading,
  onAddToCart,
}) => {
  return (
    <div className="mt-8 space-y-6">
      <StockStatus selectedVariant={selectedVariant} />

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        selectedVariant={selectedVariant}
      />

      <AddToCart
        selectedVariant={selectedVariant}
        loading={loading}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default ProductActions;