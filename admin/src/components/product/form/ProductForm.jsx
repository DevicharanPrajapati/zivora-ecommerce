import BasicInfoSection from "./BasicInfoSection";
import PricingSection from "./PricingSection";
import CategorySelect from "./CategorySelect";
import GenderSelect from "./GenderSelect";
import FeaturedSwitch from "./FeaturedSwitch";

const ProductForm = ({
  formData,
  setFormData,
  categories,
  loading,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow"
    >
      <BasicInfoSection
        formData={formData}
        setFormData={setFormData}
      />

      <PricingSection
        formData={formData}
        setFormData={setFormData}
      />

      <CategorySelect
        categories={categories}
        formData={formData}
        setFormData={setFormData}
      />

      <GenderSelect
        formData={formData}
        setFormData={setFormData}
      />

      <FeaturedSwitch
        formData={formData}
        setFormData={setFormData}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;