import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { FaArrowLeft, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    deliveryAddress,
    updateDeliveryAddress,
    getCartTotal,
    clearCart,
    user,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: deliveryAddress.fullName || "",
    addressLine1: deliveryAddress.addressLine1 || "",
    addressLine2: deliveryAddress.addressLine2 || "",
    city: deliveryAddress.city || "",
    state: deliveryAddress.state || "",
    postalCode: deliveryAddress.postalCode || "",
    country: deliveryAddress.country || "",
    phone: deliveryAddress.phone || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = getCartTotal();
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4">
          Please sign in to proceed to checkout
        </h2>
        <button
          onClick={() => navigate("/signin")}
          className="bg-emerald-600 text-white px-6 py-2 rounded-full"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must sign in to place an order.");
      navigate("/login"); // or show a popup
      return;
    }

    setIsSubmitting(true);

    // Save delivery address
    updateDeliveryAddress(formData);

    // Simulate order processing
    setTimeout(() => {
      
      setShowSuccess(true);
      // clearCart(); // 👈 empty cart after checkout
      // navigate("/");
      // window.scrollTo(0, 0);
      setIsSubmitting(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate("/cart")}
            className="bg-gradient-to-r from-emerald-300 to-emerald-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft /> Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <button
            onClick={() => navigate("/cart")}
            className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Address Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <FaMapMarkerAlt className="text-emerald-600" />
                <h2 className="text-xl font-semibold">Delivery Address</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
  <div className="space-y-2">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="paymentMethod"
        value="creditCard"
        checked={paymentMethod === "creditCard"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      Credit / Debit Card
    </label>
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="paymentMethod"
        value="cod"
        checked={paymentMethod === "cod"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      Cash on Delivery
    </label>
  </div>
</div>


                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-300 to-emerald-600 text-white font-bold py-3 px-4 rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <FaCreditCard className="text-emerald-600" />
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-gray-800">
                  Items ({cartItems.length})
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-gray-600 text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-emerald-600 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-300 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h3 className="text-xl font-bold text-emerald-600 mb-2">
              🎉 Order Placed Successfully!
            </h3>
            <p className="text-gray-600 mb-4">
              Thank you for shopping with us.
            </p>
            <button
              onClick={() => {
                clearCart(); 
                setShowSuccess(false);
                navigate("/");
              }}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
