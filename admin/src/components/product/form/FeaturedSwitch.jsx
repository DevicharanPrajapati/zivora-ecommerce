const FeaturedSwitch = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="border rounded-lg p-5 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          Featured Product
        </h2>

        <p className="text-sm text-gray-500">
          Show this product in the featured section.
        </p>
      </div>

      <input
        type="checkbox"
        checked={formData.is_featured}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            is_featured: e.target.checked,
          }))
        }
        className="w-5 h-5"
      />
    </div>
  );
};

export default FeaturedSwitch;