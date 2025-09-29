import React from "react";
import Logo from "../../assets/vase.png";
import { FaFacebook, FaInstagram, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <footer className="bg-emerald-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company details */}
          <div className="py-4 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-2">
              <img src={Logo} alt="CozyDecor Logo" className="w-[50px] h-[50px]" />
              CozyDecor
            </h1>
          </div>
          {/* Footer link details */}
          <div className="grid grid-cols-2 md:col-span-2 gap-8 md:pl-10">
            <div>
              <div className="py-4 px-4">
                {/* <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1> */}
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:translate-x-2 duration-300"
                      key={link.title}
                    >
                      <a href={link.link} className="text-gray-800 hover:text-emerald-600">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Social and contact links */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Instagram">
                  <FaInstagram className="text-2xl text-gray-800 hover:text-emerald-600" />
                </a>
                <a href="#" aria-label="Facebook">
                  <FaFacebook className="text-2xl text-gray-800 hover:text-emerald-600" />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <FaLinkedin className="text-2xl text-gray-800 hover:text-emerald-600" />
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <FaLocationArrow className="text-2xl text-gray-800" />
                  <p className="text-gray-800">Erode, Tamilnadu</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaMobileAlt className="text-2xl text-gray-800" />
                  <p className="text-gray-800">+91 121355443</p>
                </div>
              </div>
              <p className="text-gray-800">
                Copyright @ 2025 -All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;