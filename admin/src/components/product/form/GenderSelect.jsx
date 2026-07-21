const GenderSelect = ({ formData, setFormData }) => {
  const genders = [
    "Men",
    "Women",
    "Kids",
    "Unisex",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  return (
    <div className="border rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-5">
        Gender
      </h2>

      <select
        value={formData.gender}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3"
      >
        <option value="">Select Gender</option>

        {genders.map((gender) => (
          <option
            key={gender}
            value={gender}
          >
            {gender}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenderSelect;