import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Home from "./components/Home"; 
import SearchResults from "./components/SearchResults"; // 👈 new
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Pass search callback */}
          <Navbar onSearch={setSearchResults} />  

          <div className="flex-grow">
            {searchResults.length > 0 ? (
              <SearchResults results={searchResults} /> // 👈 show results
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            )}
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
