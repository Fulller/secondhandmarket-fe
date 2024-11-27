import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { selectFilters, setNewQuery } from "@redux/slices/search.slice";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = ({ className = "" }) => {
  const { q } = useSelector(selectFilters);
  const [query, setQuery] = useState(q);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.pathname != "/search") {
      navigate("/search");
    }
    dispatch(setNewQuery(query));
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`${className} flex-1 flex items-center mx-8`}>
      <div className="flex items-center w-full bg-gray-100 rounded-md p-1 pl-4">
        <input
          type="text"
          onKeyDown={handleKeyDown}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none py-1"
          placeholder="Tìm kiếm sản phẩm..."
          aria-label="Search"
        />
        {query && (
          <button
            onClick={handleClear}
            className="text-gray-500 p-2 hover:text-gray-700 focus:outline-none"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          aria-label="Submit search"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
