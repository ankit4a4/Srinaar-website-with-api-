"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import insta1 from "../../assets/home/collection.png";
import insta2 from "../../assets/home/collection.png";
import insta3 from "../../assets/home/collection.png";
import insta4 from "../../assets/home/collection.png";
import insta5 from "../../assets/home/collection.png";
import insta6 from "../../assets/home/collection.png";

import "swiper/css";

const images = [insta1, insta2, insta3, insta4, insta5, insta6];

const InstagramShowcase = () => {
  return (
    <section className="w-full bg-[#e9e5dc] py-10 sm:py-12 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          
          {/* Left Slider */}
          <div className="relative w-full max-w-[760px]">
            <div className="px-0 sm:px-2">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                speed={900}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                spaceBetween={14}
                breakpoints={{
                  0: {
                    slidesPerView: 1.2,
                    spaceBetween: 12,
                  },
                  500: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 14,
                  },
                }}
                className="w-full"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[170px] sm:h-[180px] lg:h-[175px] overflow-hidden bg-[#f5f1e9]">
                      <Image
                        src={img}
                        alt={`Instagram ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] font-serif font-normal text-[#990027]">
              Follow Our Instagram
            </h2>

            <p className="mt-3 text-[14px] text-[#990027]">@Srinaar</p>

            <button className="btn-primary mt-5">
              <span>Follow Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramShowcase;