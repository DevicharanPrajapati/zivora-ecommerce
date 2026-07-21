const brands = [
  "Nike",
  "Adidas",
  "Puma",
  "Levi's",
  "Zara",
  "H&M",
];

const BrandSelect = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      brand: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-xl border p-6 space-y-5">
      <div>
        <h2 className="text-xl font-semibold">Brand</h2>
        <p className="text-sm text-gray-500">
          Select the product brand.
        </p>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Brand
        </label>

        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Brand</option>

          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BrandSelect;