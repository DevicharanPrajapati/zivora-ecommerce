import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleClick = () => {
    console.log("Searching:", searchText);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <button
          onClick={handleClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
        >
          <IoSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
