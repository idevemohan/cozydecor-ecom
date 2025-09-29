// SearchResults.jsx
import React from "react";

function SearchResults({ results }) {
  if (!results || results.length === 0) {
    return <p className="text-center mt-6 text-gray-500">No products found</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
            <p className="text-green-600 font-bold">₹{product.price}</p>
            {product.description && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>
            )}
            <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
