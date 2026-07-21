const BasicInfoSection = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="border rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-5">
        Basic Information
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            Product Name
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Oversized T-Shirt"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Product description..."
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;