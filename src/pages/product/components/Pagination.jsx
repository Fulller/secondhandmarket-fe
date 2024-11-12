// src/components/Pagination.jsx
import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center mt-6">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
