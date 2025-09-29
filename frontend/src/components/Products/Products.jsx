import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router';
import { FaStar } from "react-icons/fa6";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/category/products");
        const data = await response.json();

        // ✅ Handle both shapes: { products: [...] } OR just [...]
        if (data.products) {
          setProducts(data.products);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleOrderNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className='mt-14 mb-12'>
      <div className='w-full'>
        {/* Header section */}
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
          <p data-aos="fade-up" className='text-sm text-emerald-400 font-semibold'>
            Top Selling Products for you!
          </p>
          <h1 data-aos="fade-up" className='text-3xl font-bold'>Products</h1>
          <p data-aos="fade-up" className='text-xs text-gray-400'>
            "Transform your home into classy home decor items with elegance."
          </p>
        </div>

        {/* Body section */}
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
          {products.length > 0 ? (
            products.map((data,index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={`${data.id}-${index}`}
                className='space-y-3'
              >
                <img
                  src={`http://localhost:5000${data.img}`}
                  alt={data.title}
                  className='h-[220px] w-[150px] object-cover rounded-md'
                />
                <div>
                  <h3 className='font-semibold'>{data.title}</h3>
                  {data.color && <p className='text-sm text-gray-600'>{data.color}</p>}
                  {data.price && (
                    <div className='flex items-center gap-1'>
                      <span>₹{data.price}</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleOrderNow(data)}
                    className="mt-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-md hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 w-full"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;