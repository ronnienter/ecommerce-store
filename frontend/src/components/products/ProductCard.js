import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded overflow-hidden shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{product.name}</h3>
        <p className="text-gray-700 text-base mb-2">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;