const PricingSection = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="border rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-5">
        Pricing
      </h2>

      <div>
        <label className="block mb-2 font-medium">
          Price (₹)
        </label>

        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="999"
          className="w-full border rounded-lg px-4 py-3"
          required
        />
      </div>
    </div>
  );
};

export default PricingSection;