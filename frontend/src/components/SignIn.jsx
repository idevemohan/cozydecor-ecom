import React, { useState } from "react";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isSignIn) {
      // ---- SIGN IN ----
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sign in failed");

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 trigger storage event so Navbar updates immediately
      window.dispatchEvent(new Event("storage"));

      setMessage("Sign in successful ✅");
      navigate("/"); // Go to homepage
    } else {
      // ---- REGISTER ----
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMessage("Registration successful 🎉. Please sign in.");
      setIsSignIn(true); // Switch to sign in form
    }
  } catch (err) {
    setMessage(err.message);
  }

  // Clear fields
  setEmail("");
  setPassword("");
  setName("");
};


  const handleClose = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg relative">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <FaTimes className="text-2xl" />
        </button>
        
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isSignIn ? "Sign In" : "Register"}
          </h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            {isSignIn ? "New user? " : "Already have an account? "}
            <span
              className="font-medium text-emerald-600 hover:text-emerald-500 cursor-pointer"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Register here" : "Sign in here"}
            </span>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isSignIn && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  id="name"
                  type="text"
                  required={!isSignIn}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
                <FaUser className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="Enter your password"
              />
              <FaLock className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {message && (
            <p className="text-center text-sm text-red-600">{message}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {isSignIn ? "Sign In" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
