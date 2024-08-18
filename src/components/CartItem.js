"use client";

import { useDispatch } from 'react-redux';
import { removeItemFromCart, updateItemQuantity } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/formatPrice';
import { useState } from 'react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemove = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      setError('Quantity cannot be less than 1');
      setQuantity(1);
      return;
    }
    if (newQuantity > 99) {  // Example limit
      setError('Quantity cannot exceed 99');
      setQuantity(99);
      return;
    }
    setError('');
    setQuantity(newQuantity);
    dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Allow the input field to be temporarily empty
    if (value === '') {
      setQuantity('');
      return;
    }
    
    const numericValue = parseInt(value, 10);
    
    // Ensure the parsed value is a number and within the valid range
    if (!isNaN(numericValue)) {
      handleQuantityChange(numericValue);
    }
  };

  const handleBlur = () => {
    // Handle when the input loses focus and the value is empty
    if (quantity === '') {
      setQuantity(item.quantity);
    }
  };

  return (
    <div className="flex flex-col p-4 border-b border-gray-200">
      <div className="flex items-center">
        <img src={item.image} alt={item.title} className="h-20 w-20 object-cover rounded-md" />
        <div className="ml-4">
          <h4 className="font-bold text-gray-800">{item.title}</h4>
          <p className="text-blue-600">{formatPrice(item.price)}</p>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <button
          onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
          className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          onBlur={handleBlur}  // Ensures the input is valid after editing
          className="mx-2 w-12 text-center border border-gray-300 rounded-md"
          min="1"
          max="99"
        />
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          +
        </button>
        <button
          onClick={handleRemove}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Remove
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CartItem;
