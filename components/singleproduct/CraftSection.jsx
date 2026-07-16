import React from "react";

const CraftSection = () => {
  return (
    <section className="bg-[#efe9de] py-6 md:py-8">
      <div className="max-w-[1400px] mx-auto border-b border-[#d8b8b8] px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-6 md:gap-10 items-center">
          {/* Left Content */}
          <div className="max-w-[520px]">
            <h2 className="text-[#8b3a3a] font-serif text-[30px] md:text-[42px] leading-tight">
              The Craft of SRINAAR
            </h2>

            <p className="mt-4 text-[#4f403c] text-[15px] md:text-[18px] leading-7 md:leading-8">
              Every SRINAAR creation is thoughtfully designed to celebrate
              heritage craftsmanship and modern femininity. This lehenga
              reflects timeless elegance with refined detailing and premium
              fabric selection.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full">
            <div className="overflow-hidden rounded-[4px]">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                alt="Craft of SRINAAR"
                className="w-full h-[220px] sm:h-[260px] md:h-[290px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;