"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";

import vaseImg from "../../assets/home/contact.png";

export default function ContactHero() {
  return (
    <section className="relative w-full bg-[#EAE7DA] ">
      <div className="relative max-w-7xl mx-auto  pb-20 px-6 sm:px-10 lg:px-16">
        
        {/* Left Content */}
        <div className="pt-16 sm:pt-20 lg:pt-24 pl-0 sm:pl-4 lg:pl-8 max-w-[520px] relative z-20">
          
          <h1 className="text-[48px] sm:text-[64px] lg:text-[80px] leading-tight font-serif text-black mb-6">
            Contact Us
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-black/80 max-w-[380px] mb-12">
            We answer your inquiries with care and provide thoughtful support
            for every question you share with us.
          </p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-black">
            
            {/* Address */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-black/70 mb-2 font-medium">
                Address
              </h3>
              <p className="text-base leading-6 text-black/80">
                540, New Street
                <br />
                New Jersey, USA
              </p>
            </div>

            {/* Phone */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-black/70 mb-2 font-medium">
                Phone
              </h3>
              <p className="text-base leading-6 text-black/80">
                +00 123 456 678
              </p>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-black/70 mb-2 font-medium">
                Email
              </h3>
              <p className="text-base leading-6 text-black/80 break-all">
                hello@srinaar.com
              </p>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-black/70 mb-3 font-medium">
                Follow us
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4">

                <div className="w-11 h-11 border border-black/40 text-black/70 flex items-center justify-center rounded-md hover:bg-black hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer">
                  <FaFacebookF size={18} />
                </div>

                <div className="w-11 h-11 border border-black/40 text-black/70 flex items-center justify-center rounded-md hover:bg-black hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer">
                  <FaInstagram size={18} />
                </div>

                <div className="w-11 h-11 border border-black/40 text-black/70 flex items-center justify-center rounded-md hover:bg-black hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer">
                  <FaPinterestP size={18} />
                </div>

                <div className="w-11 h-11 border border-black/40 text-black/70 flex items-center justify-center rounded-md hover:bg-black hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer">
                  <FaXTwitter size={18} />
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Image Bottom Right */}
        <div className="hidden md:block md:absolute bottom-[-200px] right-6 sm:right-10 lg:right-16 z-10">
          <Image
            src={vaseImg}
            alt="Decorative vase"
            width={3000}
            height={3000}
            priority
            className="w-[180px] sm:w-[240px] lg:w-[420px] h-auto object-contain"
          />
        </div>

      </div>
    </section>
  );
}