"use client"; // Ensure this file is treated as a client component

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h2>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">Thank you for your purchase!</p>
          <p className="text-sm text-gray-500 mt-2">Your order is being processed and you will receive a confirmation email shortly.</p>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Order Summary</h3>
            <ul className="list-disc pl-5">
              <li>Product 1 - $19.99</li>
              <li>Product 2 - $29.99</li>
              <li>Shipping - $5.00</li>
            </ul>
            <div className="flex justify-between mt-4 text-gray-900 font-semibold">
              <span>Total:</span>
              <span>$54.98</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Shipping Address</h3>
            <p className="text-gray-700">John Doe</p>
            <p className="text-gray-700">1234 Elm Street</p>
            <p className="text-gray-700">Some City, ST 12345</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <button 
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
