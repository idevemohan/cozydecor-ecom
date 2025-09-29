import React, { useState } from 'react'
import { IoIosMail } from "react-icons/io";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("⚠️ Please enter your email");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Subscription successful! Check your email.");
        setEmail(""); // clear input
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Failed to subscribe. Try again later.");
    }
  };

  return (
    <div className='text-center mb-10'>
      <h1 className='font-bold text-3xl flex items-center justify-center'>
        Get Exclusive Offers on Your E-mail... <IoIosMail className='text-5xl '/>
      </h1>
      <p>Subscribe to our newsletter and stay updated</p>

      <div className='flex gap-4 relative group sm:block mt-4'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your E-mail id .....'
          className='text-sm w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-emerald-400 px-4 py-2'
        />
        <button
          className='bg-emerald-400 text-white px-4 py-2 rounded-full'
          onClick={handleSubscribe}
        >
          Subscribe
        </button>      
      </div>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  )
}

export default NewsLetter;
