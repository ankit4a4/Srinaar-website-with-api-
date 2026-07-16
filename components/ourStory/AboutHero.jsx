"use client";

import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="w-full bg-[#EAE7DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8 min-h-[500px]">

          {/* Left Content */}
          <div className="max-w-[540px]">
            <h1 className="text-[42px] sm:text-[52px] lg:text-[64px] leading-tight font-serif font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#990027] to-[#590c19]">
              About Us
            </h1>

            <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.9] text-[#8D6E63] max-w-[500px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              maximus, dolor nec placerat scelerisque, urna libero lacinia nisi,
              vitae viverra augue turpis eget dui. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Cras maximus, dolor nec placerat
              scelerisque, urna libero lacinia nisi, vitae viverra augue turpis
              eget dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Cras maximus, dolor nec placerat scelerisque, urna libero lacinia
              nisi, vitae viverra augue turpis eget dui.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[280px] sm:w-[340px] lg:w-[380px] h-[360px] sm:h-[430px] lg:h-[480px]">

              {/* Soft background shape */}
              <div className="absolute -bottom-5 -left-5 w-full h-full bg-gradient-to-br from-[#990027]/10 to-[#590c19]/10 rounded-[40px]" />

              {/* Main Image */}
              <div className="relative w-full h-full rounded-t-[160px] rounded-b-[12px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/40">
                <Image
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
                  alt="About Us"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative line art effect */}
              <div className="absolute -top-10 -left-10 hidden sm:block">
                <div className="w-28 h-28 rounded-full border border-[#b88b6a]/30" />
              </div>

              <div className="absolute top-1/2 -left-12 hidden lg:flex items-center gap-2">
                <span className="w-10 h-[1px] bg-gradient-to-r from-[#990027] to-[#590c19]" />
                <span className="w-2 h-2 rounded-full bg-[#990027]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;