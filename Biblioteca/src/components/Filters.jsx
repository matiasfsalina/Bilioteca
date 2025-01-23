import React from "react";

const Filters = ({ setCategory }) => {
  const categories = ["Todas", "Historia", "Física", "Química"];

  return (
    <div className="flex justify-center space-x-4 my-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCategory(category)}
          className="px-4 py-2 border rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filters;
