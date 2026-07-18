"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGetProductsQuery, fileUrl } from "@/lib/redux/api";

import "swiper/css";

const InstagramShowcase = () => {
  // "Shop the feed" — a real gallery of product photos instead of a fake feed
  const { data, isLoading } = useGetProductsQuery({ limit: 8 });
  const products = data?.products || [];

  return (
    <section className="w-full bg-[#e9e5dc] py-10 sm:py-12 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">

          {/* Left Slider */}
          <div className="relative w-full max-w-[760px]">
            <div className="px-0 sm:px-2">
              {isLoading && (
                <div className="flex gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[170px] sm:h-[180px] lg:h-[175px] w-1/3 shrink-0 animate-pulse rounded bg-black/10"
                    />
                  ))}
                </div>
              )}

              {!isLoading && products.length > 0 && (
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
                  {products.map((product) => (
                    <SwiperSlide key={product._id}>
                      <Link
                        href={`/singleproduct/${product._id}`}
                        className="relative block h-[170px] sm:h-[180px] lg:h-[175px] overflow-hidden bg-[#f5f1e9]"
                      >
                        <img
                          src={fileUrl(product.images?.[0]) || "https://placehold.co/400x400?text=Srinaar"}
                          alt={product.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.1] font-serif font-normal text-[#990027]">
              Follow Our Instagram
            </h2>

            <p className="mt-3 text-[14px] text-[#990027]">@Srinaar</p>

            <a href="https://instagram.com/srinaar" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary mt-5">
                <span>Follow Now</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramShowcase;
