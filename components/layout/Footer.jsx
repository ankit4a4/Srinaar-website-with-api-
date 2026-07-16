"use client";

import Image from "next/image";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { PiThreadsLogoLight } from "react-icons/pi";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#990027] to-[#330113] text-white pt-16 pb-10 px-6">

      {/* TOP GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

        {/* COLUMN 1 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            Top Categories
          </h3>
          <ul className="space-y-2 text-md  text-gray-200">
            <li>Anarkali Suit Sets</li>
            <li>Kurtas</li>
            <li>Palazzos</li>
            <li>Lehenga</li>
            <li>Straight Suit Sets</li>
          </ul>
        </div>

        {/* COLUMN 2 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            Customer Service
          </h3>
          <ul className="space-y-2 text-md  text-gray-200">
            <li>Returns & Cancellation</li>
            <li>FAQs</li>
            <li>Contact us</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            Srinaar Brand
          </h3>
          <ul className="space-y-2 text-md  text-gray-200">
            <li>About us</li>
            <li>Investor Information</li>
            <li>Business Enquiry</li>
            <li>Achievements</li>
            <li>Store Locator</li>
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            My Profile
          </h3>
          <ul className="space-y-2 text-md  text-gray-200">
            <li>My Account</li>
            <li>Track Order</li>
            <li>My Cart</li>
            <li>Returns & Cancellation</li>
            <li>Wishlist</li>
            <li>Order History</li>
          </ul>
        </div>

        {/* COLUMN 5 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2 text-md  text-gray-200">
            <li>Shipping Policy</li>
            <li>Privacy Policy</li>
            <li>Careers</li>
            <li>Terms of Use</li>
          </ul>
        </div>
      </div>

      {/* CENTER LOGO */}
      <div className="flex flex-col items-center justify-center mt-16">

        <Image
          src={logo}
          alt="Srinaar"
          width={140}
          height={140}
          className="mb-4"
        />

        <p className="text-sm  tracking-widest text-gray-200 mb-6">
          Follow us
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex gap-12 text-xl md:text-2xl">
          <FaInstagram className="hover:scale-125 transition duration-300 cursor-pointer" />
          <FaWhatsapp className="hover:scale-125 transition duration-300 cursor-pointer" />
          <FaLinkedinIn className="hover:scale-125 transition duration-300 cursor-pointer" />
          <FaXTwitter className="hover:scale-125 transition duration-300 cursor-pointer" />
          <PiThreadsLogoLight className="hover:scale-125 transition duration-300 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}