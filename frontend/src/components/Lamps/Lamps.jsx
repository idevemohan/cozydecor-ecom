import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useCart } from '../CartContext';
import { useNavigate } from "react-router";

const Lamps = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/category/lamps");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching lamps:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleOrderNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div id="lamps" className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="mb-12 text-center">
          <p className="text-sm text-emerald-400">Illuminate Your Space</p>
          <h1 className="text-3xl font-bold">Lamps</h1>
          <p className="text-xs text-gray-400">Brighten up with modern designs.</p>
        </div>

        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((data,index) => (
            <div
              key={`${data.id}-${index}`}
              className="rounded-2xl bg-white shadow-xl duration-300 group max-w-[300px] mx-auto"
            >
              <div>
                <img
                  src={`http://localhost:5000${data.img}`}
                  alt={data.title}
                  className="w-[300px] h-[300px] rounded-lg block mx-auto transform -translate-y-10 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              <div className="p-4 text-center">
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500">{data.description}</p>
                <button 
                onClick={() => handleOrderNow(data)}
                className="bg-gradient-to-r from-emerald-300 to-emerald-600 text-white font-bold transition-all duration-300 mt-4 hover:scale-105 py-1 px-4 rounded-full">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lamps;