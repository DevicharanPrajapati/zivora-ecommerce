const CategorySelect = ({
  categories,
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      category_id: e.target.value,
    }));
  };

  return (
    <div className="border rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-5">
        Category
      </h2>

      <select
        value={formData.category_id}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3"
        required
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;