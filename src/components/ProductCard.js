import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const { image, title, price, rating, category } = product;
  const { rate, count } = rating;

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col">
      <a href="#" className="block">
        <img 
          className="w-full h-48 object-cover md:h-56 lg:h-64" 
          src={image} 
          alt={title} 
        />
      </a>
      <div className="p-4 flex flex-col flex-grow">
        <a href="#">
          <h5 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h5>
        </a>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {category}
        </p>
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, index) => (
              <svg 
                key={index} 
                className={`w-4 h-4 md:w-5 md:h-5 ${index < Math.floor(rate) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="currentColor" 
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
            ))}
          </div>
          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 ml-2">{rate} ({count})</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <button 
            onClick={() => onAddToCart(product)} 
            className="px-3 py-1.5 bg-gray-900 text-white text-xs md:text-sm font-bold rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
