"use client";
import { useGetProductsQuery } from "@/lib/redux/api";
import ProductCard from "@/components/common/ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";

export default function AlsoLike({ currentProductId }) {
  const { data, isLoading } = useGetProductsQuery({ limit: 6 });
  const products = (data?.products || [])
    .filter((p) => p._id !== currentProductId)
    .slice(0, 4);

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="bg-[#e9e3d9] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="flex md:flex hidden items-center relative w-full max-w-[260px]">
            <span className="w-2 h-2 bg-[#4C0018] rounded-full absolute "></span>
            <div className="flex-1 h-[1px] bg-[#4C0018] "></div>
            <span className="w-2 h-2 bg-[#4C0018] rounded-full right-3 absolute"></span>
            <span className="w-3 h-3 bg-[#4C0018] rounded-full"></span>
          </div>

          <h2 className="text-3xl font-serif text-gray-600 whitespace-nowrap">
            You May Also Like
          </h2>

          <div className="flex items-center md:flex hidden w-full relative max-w-[260px]">
            <span className="w-3 h-3 bg-[#4C0018] rounded-full"></span>
            <span className="w-2 h-2 bg-[#4C0018] rounded-full left-3 absolute mr-1"></span>
            <div className="flex-1 h-[1px] bg-[#4C0018] "></div>
            <span className="w-2 h-2 bg-[#4C0018] rounded-full"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 lg:grid-cols-4 lg:gap-x-6">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}

          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
