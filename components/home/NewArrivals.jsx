"use client";
import Link from "next/link";
import { useGetProductsQuery, fileUrl } from "@/lib/redux/api";

export default function NewArrivals() {
  // Latest 3 products (already sorted newest-first by the backend)
  const { data, isLoading } = useGetProductsQuery({ limit: 3 });
  const products = data?.products || [];

  if (!isLoading && products.length === 0) return null;

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
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[470px] rounded-2xl bg-black/10 animate-pulse" />
          ))}

        {products.map((product) => (
          <Link
            href={`/singleproduct/${product._id}`}
            key={product._id}
            className="relative rounded-2xl overflow-hidden shadow-xl group block"
          >
            <img
              src={fileUrl(product.images?.[0]) || "https://placehold.co/400x520?text=Srinaar"}
              alt={product.name}
              className="w-full h-[470px] object-cover group-hover:scale-105 transition duration-500"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* text */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-3xl font-serif leading-tight mb-4 line-clamp-2">
                {product.name}
              </h3>

              <button className="px-6 py-2 rounded-md text-sm btn-primary">
                <span>Explore</span>
              </button>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
