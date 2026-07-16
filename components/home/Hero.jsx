"use client";
import "@/app/globals.css";

import heroImg from "../../assets/home/hero.png";

export default function Hero() {
  return (
    <section
      className="relative h-[500px] md:h-screen w-full flex items-center"
      style={{
        backgroundImage: `url(${heroImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl text-white">

          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Grace in <br />
            Every <span className="text-red-600 italic">Thread</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Draped in heritage. Defined by grace.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="btn-primary">
              <span>SHOP NOW</span>
            </button>

            <button className="btn-outline">
              <span>NEW ARRIVAL</span>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}