"use client";
import Image from "next/image";
import img from "../../assets/home/collection.png"
const products = [
  {
    title: "Straight Suit",
    image: img,
    primary: false,
  },
  {
    title: "Straight Suit",
    image: img,
    primary: true,
  },
  {
    title: "Straight Suit",
    image: img,
    primary: false,
  },
];

export default function NewArrivals() {
  return (
    <section className="bg-[#e9e3d9] py-16 relative">

    

         <div className="flex items-center justify-center gap-6 mb-12">

                    {/* Left Side */}
                    <div className="flex  md:flex hidden items-center relative w-full max-w-[260px]">
                        <span className="w-2 h-2 bg-[#4C0018] rounded-full absolute "></span>
                        <div className="flex-1 h-[1px] bg-[#4C0018] "></div>
                        <span className="w-2 h-2 bg-[#4C0018] rounded-full right-3 absolute"></span>
                        <span className="w-3 h-3 bg-[#4C0018] rounded-full"></span>

                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl font-serif text-gray-600 whitespace-nowrap">
                         New Arrivals
                    </h2>

                    {/* Right Side */}
                    <div className="flex items-center  md:flex hidden w-full relative max-w-[260px]">
                        <span className="w-3 h-3 bg-[#4C0018] rounded-full"></span>
                        <span className="w-2 h-2 bg-[#4C0018] rounded-full left-3 absolute mr-1"></span>
                        <div className="flex-1 h-[1px] bg-[#4C0018] "></div>
                        <span className="w-2 h-2 bg-[#4C0018] rounded-full"></span>
                    </div>

                </div>

      {/* Red background bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[280px] bg-gradient-to-r from-[#990027] to-[#330113]"></div>

      {/* Cards */}
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

        {products.map((item, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden shadow-xl group"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={520}
              className="w-full h-[470px] object-cover group-hover:scale-105 transition duration-500"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* text */}
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-3xl font-serif leading-tight mb-4">
                Straight  Suit
              </h3>

              <button
                className={`px-6 py-2 rounded-md text-sm btn-primary`}
              >
                <span>Explore</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}