import React, { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Logo from "../../assets/vase.png";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { HiMenu, HiX } from "react-icons/hi";

const Menu = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "Top Rated", link: "/#TopProducts" },
  { id: 3, name: "Home Decor", link: "/#home-decor" },
  { id: 4, name: "Furnitures", link: "/#furniture" },
  { id: 5, name: "Lamp", link: "/#lamps" },
];

const Navbar = ({ onSearch }) => {
  const { getCartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (search.trim().length < 2) {
        onSearch([]);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/search?q=${search}`
        );
        const data = await res.json();
        onSearch(data || []);
      } catch (err) {
        console.error("Search error:", err);
        onSearch([]);
      }
    };

    const debounce = setTimeout(fetchResults, 400);
    return () => clearTimeout(debounce);
  }, [search, onSearch]);

  // Check authentication on mount
  // ✅ Check authentication on mount + listen for changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth(); // run on mount
    window.addEventListener("storage", checkAuth); // run when localStorage changes

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Handle Sign In / Sign Out
  const handleAuthAction = () => {
    if (isLoggedIn) {
      // ---- LOGOUT ----
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } else {
      // ---- SIGN IN ----
      navigate("/signin");
    }
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper navbar */}
      <div className="py-2 bg-emerald-200">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="font-bold text-3xl flex items-center gap-1">
            <img src={Logo} alt="Logo" className="w-[40px] h-[40px]" />
            CozyDecor
          </a>

          {/* Right side */}
          <div className="flex items-center gap-4 relative">
            {/* Search bar */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                value={search} // ✅ bind to state
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items here ....."
                className="text-sm w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-emerald-600 px-2 py-1"
              />
              <MdOutlineSearch className="text-gray-500 group-hover:text-emerald-500 absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* Order button */}
            <button
              onClick={() => navigate("/cart")}
              className="bg-gradient-to-r from-emerald-300 to-emerald-600 text-white font-bold py-1 px-4 rounded-full flex items-center gap-3 group relative"
            >
              <span className="group-hover:block hidden">Order</span>
              <FaShoppingCart className="text-xl text-white drop-shadow-sm cursor-pointer" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Auth Button (Toggle) */}
            <button
              onClick={handleAuthAction}
              className="bg-gradient-to-r from-emerald-300 to-emerald-600 text-white font-bold py-1 px-4 rounded-full flex items-center gap-2"
            >
              <CgProfile className="text-xl text-white drop-shadow-sm" />
              {isLoggedIn ? `Sign Out (${user?.name || "User"})` : "Sign In"}
            </button>
            {/* Hamburger for small screens */}
            <button
              className="sm:hidden text-3xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-emerald-100 p-4">
          <ul className="flex flex-col gap-3">
            {Menu.map((data) => (
              <li key={data.id}>
                <Link
                  href={data.link}
                  className="block px-2 py-1 hover:bg-emerald-300 rounded"
                  onClick={() => setMenuOpen(false)} // close menu after click
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lower navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-emerald-300 duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
