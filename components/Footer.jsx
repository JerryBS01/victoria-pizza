import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className="relative px-2 py-8 z-30 overflow-hidden" id="contact">
      <motion.div
        className="absolute inset-0 hidden md:block"
        initial={{ x: 0, y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        <Image src="/img/bg.png" width={1920} height={1080} alt="" />
      </motion.div>

      <div
        className="absolute inset-0 md:hidden"
      >
        <Image src="/img/bg.png" fill alt="" />
      </div>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="flex flex-col md:flex-row justify-between items-center backdrop-filter backdrop-blur-sm text-white">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold text-center">
            GRAB YOUR PIZZA. WELL FED VICTORIA.
          </h2>
        </div>

        <div className="md:w-1/4 flex flex-col items-center ">
          <div className="border-2 border-white p-4 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-2">
              Subscribe to our Newsletter
            </h2>

            <h3 className="text-sm mb-4">Never miss our latest promotions and updates!</h3>

            <form className="flex flex-row items-center gap-3">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="border rounded-sm text-black p-2"
              />

              <button
                type="submit"
                className="bg-gray-900 text-white rounded-sm p-2 hover:bg-black hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex flex-row space-between gap-4 mt-4 mb-4 md:mb-0">
            <Link href="https://www.instagram.com">
              <div className="hover:scale-110 hover:text-gray-300">
                <FaInstagram size={20} />
              </div>
            </Link>
            <Link href="https://www.facebook.com">
              <div className="hover:scale-110 hover:text-gray-300">
                <FaFacebook size={20} />
              </div>
            </Link>
            <Link href="https://www.twitter.com">
              <div className="hover:scale-110 hover:text-gray-300">
                <FaTwitter size={20} />
              </div>
            </Link>
          </div>
        </div>

        <div className="md:w-1/4">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Restaurant Address</h2>
            <p className="text-sm">
              123 Main Street
              <br /> Suburb City, VIC 3000
              <br /> +61 480 345 678
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Working Hours</h2>
            <p className="text-sm">
              Monday - Friday
              <br /> 9:00 - 22:00
            </p>
            <p className="text-sm">
              Saturday - Sunday
              <br /> 12:00 - 24:00
            </p>
          </div>
        </div>

        <div className="flex md:hidden mt-8">2024 Victoria Pizza. All rights reserved.</div>
        <div className="hidden md:flex absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3">2024 Victoria Pizza. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer