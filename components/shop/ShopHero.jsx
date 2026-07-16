"use client";

import Image from "next/image";
import heroImg from "../../assets/home/shopHero.png"; // apni image ka path laga dena

export default function ShopHero({heading , heading2}) {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        <Image
          src={heroImg}
          alt="Luxury Collections"
          priority
          className="w-full h-auto block"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-[500px] ml-2 sm:ml-6 md:ml-10 lg:ml-14">
              <h1 className="font-serif text-white text-[24px] leading-[1.15] sm:text-[34px] md:text-[46px] lg:text-[52px]">
                <span className="block">{heading}</span>
               
                  <span className="text-[#7f0f1d] italic font-medium">
                    {heading2}
                  </span>
                </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}