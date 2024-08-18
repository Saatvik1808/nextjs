"use client"; // Ensure this file is treated as a client component
import "./globals.css"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, resetDiscount } from '../store/slices/cartSlice'; 
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import { useRouter } from 'next/navigation'; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart); 
  const router = useRouter(); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty. Add items to your cart before checking out.');
      return;
    }
    dispatch(resetDiscount()); 
    router.push('/checkout'); 
  };

  const handleFilterChange = ({ priceRange, categories, ratings }) => {
    const filtered = products.filter(product => {
      const isInPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const isInCategory = categories.length === 0 || categories.includes(product.category);
      const isInRating = ratings.length === 0 || ratings.some(r => product.rating.rate >= Number(r));
      return isInPriceRange && isInCategory && isInRating;
    });
    setFilteredProducts(filtered);
  };

  return (
<div className="container mx-auto p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen mt-14">
     
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/4">
          <Filter 
            categories={[...new Set(products.map(p => p.category))]} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
