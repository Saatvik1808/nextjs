"use client";

import { useSelector } from 'react-redux';
import { ShoppingCartIcon } from '@heroicons/react/24/solid'; 
import Link from 'next/link';

const Header = () => {
  const { items } = useSelector((state) => state.cart);

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md rounded-lg">
      <Link href="/" className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition duration-300 ease-in-out">
        Shop
      </Link>
      <div className="relative flex items-center">
        <Link href="/cart" className="relative flex items-center space-x-2">
          <ShoppingCartIcon className="h-8 w-8 text-white hover:text-yellow-300 transition duration-300 ease-in-out" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
              {items.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
