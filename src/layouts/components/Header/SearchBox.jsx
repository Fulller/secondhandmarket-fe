// src/components/SearchBox.jsx
import React, { useState, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

export default function SearchBox({ className }) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate(); 

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current.focus();
  };

  return (
    <div className={className + " flex-1 flex items-center mx-8"}>
      <div className="flex items-center w-full bg-gray-100 rounded-md p-1 pl-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none py-1"
          placeholder="Tìm kiếm sản phẩm..."
          ref={inputRef}
        />
        {searchTerm && (
          <button onClick={handleClear} className="text-gray-500 p-2">
            <FaTimes />
          </button>
        )}
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600">
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
