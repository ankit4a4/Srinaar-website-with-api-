"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { PiThreadsLogoLight } from "react-icons/pi";
import logo from "../../assets/logo.png";
import { useGetCategoriesQuery } from "@/lib/redux/api";

export default function Footer() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  // Capped at 4 so the column doesn't grow taller than the rest as more
  // categories get added in the admin panel.
  const topCategories = (categories || []).slice(0, 4);

  return (
    <footer className="bg-gradient-to-b from-[#990027] to-[#330113] text-white pt-16 pb-10 px-6">

      {/* TOP GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

        {/* COLUMN 1 — real categories from the backend, capped at 4 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            Top Categories
          </h3>
          <ul className="space-y-2 text-md text-gray-200">
            {isLoading && <li className="text-gray-400">Loading…</li>}
            {!isLoading && topCategories.length === 0 && (
              <li className="text-gray-400">No categories yet</li>
            )}
            {topCategories.map((cat) => (
              <li key={cat._id}>
                <Link href={`/collection/${cat._id}`} className="hover:text-white transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 2 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            Customer Service
          </h3>
          <ul className="space-y-2 text-md text-gray-200">
            <li>
              <Link href="/returns" className="hover:text-white transition-colors">
                Returns & Cancellation
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            Srinaar Brand
          </h3>
          <ul className="space-y-2 text-md text-gray-200">
            <li>
              <Link href="/our-story" className="hover:text-white transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link href="/investor-information" className="hover:text-white transition-colors">
                Investor Information
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Business Enquiry
              </Link>
            </li>
            <li>
              <Link href="/achievements" className="hover:text-white transition-colors">
                Achievements
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            My Profile
          </h3>
          <ul className="space-y-2 text-md text-gray-200">
            <li>
              <Link href="/profile" className="hover:text-white transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-white transition-colors">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition-colors">
                My Cart
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-white transition-colors">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-white transition-colors">
                Order History
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 5 */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 tracking-wide uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2 text-md text-gray-200">
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </li>
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
          <a href="https://instagram.com/srinaar" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:scale-125 transition duration-300 cursor-pointer" />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="hover:scale-125 transition duration-300 cursor-pointer" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="hover:scale-125 transition duration-300 cursor-pointer" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="hover:scale-125 transition duration-300 cursor-pointer" />
          </a>
          <a href="https://threads.net" target="_blank" rel="noopener noreferrer">
            <PiThreadsLogoLight className="hover:scale-125 transition duration-300 cursor-pointer" />
          </a>
        </div>
      </div>
    </footer>
  );
}
