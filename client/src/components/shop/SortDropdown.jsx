import { useSearchParams } from "react-router-dom";

const SortDropdown = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }

    setSearchParams(params);
  };

  return (
    <select
      onChange={handleChange}
      value={searchParams.get("sort") || ""}
      className="border rounded-lg px-4 py-2"
    >
      <option value="">Newest</option>
      <option value="price-asc">
        Price: Low to High
      </option>
      <option value="price-desc">
        Price: High to Low
      </option>
    </select>
  );
};

export default SortDropdown;