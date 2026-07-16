"use client";

import royalImg from "@/assets/home/royal.png";
import traditionImg from "@/assets/home/royal2.png";
import regalImg from "@/assets/home/royal3.png";

const slides = [
  {
    id: 1,
    image: royalImg.src,
    align: "right",
    subtitle: "Royal",
    title: "Heritage",
    button: "Explore",
    overlay:
      "linear-gradient(270deg, rgba(28,14,8,0.72) 0%, rgba(28,14,8,0.28) 38%, rgba(0,0,0,0) 100%)",
  },
  {
    id: 2,
    image: traditionImg.src,
    align: "left",
    subtitle: "",
    title: "Tradition in Style",
    button: "Explore",
    overlay:
      "linear-gradient(90deg, rgba(142,84,47,0.78) 0%, rgba(142,84,47,0.38) 35%, rgba(0,0,0,0) 100%)",
  },
  {
    id: 3,
    image: regalImg.src,
    align: "right",
    subtitle: "Classic",
    title: "Regal Charm",
    button: "Explore",
    overlay:
      "linear-gradient(270deg, rgba(47,23,13,0.75) 0%, rgba(47,23,13,0.35) 38%, rgba(0,0,0,0) 100%)",
  },
];

export default function RoyalHeritage() {
  return (
    <section className="w-full">
      {slides.map((slide) => (
        <div key={slide.id} className="relative w-full overflow-hidden">
          {/* Actual image, so section height = image height */}
          <img
            src={slide.image}
            alt={slide.title}
            className="block w-full h-auto"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: slide.overlay,
            }}
          />

          {/* Light dark overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Content */}
          <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl items-center px-6 sm:px-8 lg:px-10 left-1/2 -translate-x-1/2">
            <div
              className={`flex w-full ${
                slide.align === "left" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[520px] text-white ${
                  slide.align === "left" ? "text-left" : "text-center"
                }`}
              >
                {slide.id === 1 ? (
                  <>
                    <p className="mb-2 font-serif text-[28px] text-[#b1002d] sm:text-[36px] md:text-[48px]">
                      {slide.subtitle}
                    </p>
                    <h2 className="font-serif text-[54px] leading-[0.9] sm:text-[74px] md:text-[100px] lg:text-[118px]">
                      Heritage
                    </h2>

                    <div
                      className={`mt-8 flex ${
                        slide.align === "left"
                          ? "justify-start"
                          : "justify-center"
                      }`}
                    >
                      <button className="rounded-md bg-[#d70032] px-8 py-3 text-sm font-medium text-white transition duration-300 hover:scale-105 hover:bg-[#b5002b]">
                        {slide.button}
                      </button>
                    </div>
                  </>
                ) : slide.id === 2 ? (
                  <>
                    <h2 className="font-serif text-[44px] leading-[0.95] sm:text-[62px] md:text-[82px] lg:text-[96px]">
                      Tradition <span className="inline-block">in</span>
                      <br />
                      Style
                    </h2>

                    <div
                      className={`mt-8 flex ${
                        slide.align === "left"
                          ? "justify-start"
                          : "justify-center"
                      }`}
                    >
                      <button className="rounded-md bg-[#d70032] px-8 py-3 text-sm font-medium text-white transition duration-300 hover:scale-105 hover:bg-[#b5002b]">
                        {slide.button}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-2 font-serif text-[24px] sm:text-[30px] md:text-[36px]">
                      {slide.subtitle}
                    </p>
                    <h2 className="font-serif text-[48px] leading-[0.92] sm:text-[68px] md:text-[88px] lg:text-[100px]">
                      Regal
                      <br />
                      Charm
                    </h2>

                    <div
                      className={`mt-8 flex ${
                        slide.align === "left"
                          ? "justify-start"
                          : "justify-center"
                      }`}
                    >
                      <button className="rounded-md bg-[#d70032] px-8 py-3 text-sm font-medium text-white transition duration-300 hover:scale-105 hover:bg-[#b5002b]">
                        {slide.button}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}