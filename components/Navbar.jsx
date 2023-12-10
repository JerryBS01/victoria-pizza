import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose, IoPizza, IoCart } from "react-icons/io5";
import { motion } from 'framer-motion';
import dynamic from "next/dynamic";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isTransparent, setTransparent] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setTransparent(scrollPosition > 0);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex flex-row justify-between items-center bg-red-500 h-20 px-6 sticky top-0 z-50 ${isTransparent ? 'bg-opacity-75 transition-all' : ''}`}>
      <div className="group flex items-center hover:scale-105 transition-all">
        <div className="text-white group-hover:text-gray-300 font-lobster text-xl text-center">
          <p>VICTORIA</p>
          <p>PIZZA</p>
        </div>
      </div>

      {/* Hamburger menu button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        {!isMenuOpen ? (
          <GiHamburgerMenu size={30} />
        ) : (
          <IoClose />
        )}
      </button>

      {/* Animate the menu items */}
      {isMenuOpen && (
        <motion.div
          className="flex flex-col items-center gap-4 absolute top-0 left-0 bg-red-500 text-white shadow-xl p-4 rounded-lg transform -translate-x-1/2 w-full z-50"
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          exit={{ y: -200 }}
          transition={{ duration: 1 }}
        >
          <div onClick={toggleMenu}>
            <IoClose size={30} />
          </div>
          <Link onClick={toggleMenu} href="/">
            Home
          </Link>
          <Link onClick={toggleMenu} href="/#featured">
            Promotions
          </Link>
          <Link onClick={toggleMenu} href="/#menu">
            <IoPizza size={30} />
          </Link>
          <Link onClick={toggleMenu} href="/#about">
            About Us
          </Link>
          <Link onClick={toggleMenu} href="/#contact">
            Contact Us
          </Link>
        </motion.div>
      )}

      {/* Menu items for larger screens */}
      <div className="md:flex items-center gap-24 flex-row hidden text-white">
        <Link className="hover:scale-105 hover:text-gray-300 hover:border-b-2 transition-all" href="/">
          Home
        </Link>
        <Link className="hover:scale-105 hover:text-gray-300 hover:border-b-2 transition-all" href="/#featured">
          Promotions
        </Link>
        <Link className="hover:scale-105 hover:text-gray-300 transition-all" href="/#menu">
          <IoPizza size={30} />
        </Link>
        <Link className="hover:scale-105 hover:text-gray-300 hover:border-b-2 transition-all" href="/#about">
          About Us
        </Link>
        <Link className="hover:scale-105 hover:text-gray-300 hover:border-b-2 transition-all" href="/#contact">
          Contact Us
        </Link>
      </div>

      {/* Cart icon */}
      <div className="group flex items-center relative">
        <div className="text-white group-hover:scale-105 group-hover:text-gray-300 transition-all">
          <Link href="/cart">
            <IoCart size={30} />
            {quantity > 0 && (
              <div className="absolute -top-3 -right-3 bg-white group-hover:bg-gray-300 text-red-500 font-semibold px-2 py-0.5 text-xs rounded-full transition-all">
                {quantity}
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });