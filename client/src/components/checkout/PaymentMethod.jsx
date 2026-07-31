const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="bg-white rounded-xl border p-6 mt-6">
      <h2 className="text-xl font-semibold mb-5">
        Payment Method
      </h2>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          value="Cash on Delivery"
          checked={paymentMethod === "Cash on Delivery"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        <span>Cash on Delivery</span>
      </label>
    </div>
  );
};

export default PaymentMethod;