"use client";

import React, { useState, useEffect } from 'react';

const Filter = ({ categories, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 500]); // Default range
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedRatings, setSelectedRatings] = useState(new Set());
  const [error, setError] = useState('');

  useEffect(() => {
    onFilterChange({
      priceRange,
      categories: Array.from(selectedCategories),
      ratings: Array.from(selectedRatings)
    });
  }, [priceRange, selectedCategories, selectedRatings]);

  const handlePriceChange = (e, index) => {
    const value = Number(e.target.value);
    
    if (isNaN(value) || value < 0 || value > 500) {
      setError('Price must be between $0 and $500');
      return;
    }

    setError('');
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;

    if (newPriceRange[0] > newPriceRange[1]) {
      setError('Minimum price cannot be greater than maximum price');
      return;
    }

    setPriceRange(newPriceRange);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories(prev => {
      const newCategories = new Set(prev);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      return newCategories;
    });
  };

  const handleRatingChange = (e) => {
    const rating = e.target.value;
    setSelectedRatings(prev => {
      const newRatings = new Set(prev);
      if (newRatings.has(rating)) {
        newRatings.delete(rating);
      } else {
        newRatings.add(rating);
      }
      return newRatings;
    });
  };

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Price Range Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">Price Range</label>
        <input 
          type="range" 
          min="0" 
          max="500" 
          step="1" 
          value={priceRange[0]} 
          onChange={e => handlePriceChange(e, 0)}
          className="w-full mt-2"
        />
        <input 
          type="range" 
          min="0" 
          max="500" 
          step="1" 
          value={priceRange[1]} 
          onChange={e => handlePriceChange(e, 1)}
          className="w-full mt-2"
        />
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Category Checkboxes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input 
                id={`category-${category}`}
                type="checkbox" 
                value={category} 
                checked={selectedCategories.has(category)}
                onChange={handleCategoryChange} 
                className="form-checkbox text-blue-600 dark:text-blue-400"
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-600 dark:text-gray-400">{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Checkboxes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">Rating</label>
        <div className="space-y-2">
          {[1, 2, 3, 4].map(rating => (
            <div key={rating} className="flex items-center">
              <input 
                id={`rating-${rating}`}
                type="checkbox" 
                value={rating}
                checked={selectedRatings.has(rating.toString())}
                onChange={handleRatingChange} 
                className="form-checkbox text-yellow-600 dark:text-yellow-400"
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {rating} and above
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
