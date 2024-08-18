"use client"; // Ensure this file is treated as a client component
import Link from 'next/link';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen mt-14">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h2>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">Thank you for your purchase!</p>
          <p className="text-sm text-gray-500 mt-2">Your order is being processed and you will receive a confirmation email shortly contact saatvik.shrivastava08@gmail.com</p>
        </div>
        <Link href="/" >
        
     
        <div className="text-center mt-6">
          <button 
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Continue Shopping
          </button>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
