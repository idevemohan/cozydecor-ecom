import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FaShoppingCart className="mx-auto text-6xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart to continue</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-emerald-300 to-emerald-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 mx-auto"
            >
              <FaArrowLeft /> Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2"
          >
            <FaArrowLeft /> Continue Shopping
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({getCartCount()})</h2>
                
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <p className="text-emerald-600 font-semibold mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">$5.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(getCartTotal() + 5.99 + (getCartTotal() * 0.08)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-to-r from-emerald-300 to-emerald-600 text-white font-bold py-3 px-4 rounded-full hover:scale-105 transition-all duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;