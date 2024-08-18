"use client";

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import CartItem from '../../components/CartItem';
import { formatPrice } from '../../utils/formatPrice';
import { applyDiscount, clearCart } from '../../store/slices/cartSlice';
import { useRouter } from 'next/navigation'; 
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'; 

const CartPage = () => {
  const { items, subtotal, discount, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState('');
  const [error, setError] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const router = useRouter(); 

  const handleApplyDiscount = () => {
    if (!discountCode) {
      setError('Please select a discount code');
      return;
    }
    if (discountCode !== 'DISCOUNT10' && discountCode !== 'FIXED20') {
      setError('Invalid discount code');
      return;
    }

    setError('');
    const discountType = discountCode.includes('DISCOUNT') ? 'percentage' : 'fixed';
    const discountValue = discountCode.includes('10') ? 10 : 20;
    dispatch(applyDiscount({ type: discountType, value: discountValue }));
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      setCheckoutMessage('Your cart is empty. Add items to your cart before checking out.');
      return;
    }
    dispatch(clearCart()); // Clear the cart
    router.push('/checkout');
  };

  return (
<div className="container mx-auto p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen mt-14">
<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">Your Cart</h2>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6 md:mt-8 bg-white shadow-lg rounded-lg p-4 md:p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between mb-4 text-gray-700">
              <span className="font-semibold">Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mb-4 text-gray-700">
              <span className="font-semibold">Discount:</span>
              <span>{formatPrice(discount)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mb-6 text-gray-900">
              <span className="font-semibold">Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
              <select
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select discount code</option>
                <option value="DISCOUNT10">DISCOUNT10 - 10% off</option>
                <option value="FIXED20">FIXED20 - $20 off</option>
              </select>
              <button
                onClick={handleApplyDiscount}
                className="mt-3 md:mt-0 md:ml-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <CheckIcon className="w-5 h-5 inline-block mr-1" aria-hidden="true" />
                Apply
              </button>
            </div>
            {error && (
              <div className="text-red-600 text-sm mb-4">
                <XMarkIcon className="w-5 h-5 inline-block mr-1" aria-hidden="true" />
                {error}
              </div>
            )}
            <button
              onClick={handleCheckout}
              className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <CheckIcon className="w-5 h-5 inline-block mr-1" aria-hidden="true" />
              Checkout
            </button>
            {checkoutMessage && (
              <div className="text-red-600 text-sm mt-4">
                <XMarkIcon className="w-5 h-5 inline-block mr-1" aria-hidden="true" />
                {checkoutMessage}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
