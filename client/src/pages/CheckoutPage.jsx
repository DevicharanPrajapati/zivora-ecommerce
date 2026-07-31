import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddressSelector from "../components/checkout/AddressSelector";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  console.log("from ", user)

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery",
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <AddressSelector
            userId={user?.id}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onAddAddress={() => navigate("/addresses")}
          />

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        {/* Right Side */}
        <div>
          <OrderSummary
            selectedAddress={selectedAddress}
            paymentMethod={paymentMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;