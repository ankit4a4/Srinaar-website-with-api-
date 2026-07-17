"use client";

import { useMemo } from "react";
import { useGetProductsQuery } from "@/lib/redux/api";
import { getRecentlyViewedIds } from "@/lib/utils/recentlyViewed";
import ProductCard from "@/components/common/ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";

export default function RecentlyViewed() {
  // Fetch a reasonably large pool once; we either pick the viewed ones out
  // of it (in view order) or fall back to the latest products.
  const { data, isLoading } = useGetProductsQuery({ limit: 40 });
  const allProducts = data?.products || [];

  const { products, heading } = useMemo(() => {
    const viewedIds = getRecentlyViewedIds();

    if (viewedIds.length > 0) {
      const byId = new Map(allProducts.map((p) => [p._id, p]));
      const viewed = viewedIds.map((id) => byId.get(id)).filter(Boolean).slice(0, 4);
      if (viewed.length > 0) {
        return { products: viewed, heading: "Recently Viewed" };
      }
    }

    return { products: allProducts.slice(0, 4), heading: "Latest Arrivals" };
  }, [allProducts]);

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 flex items-center justify-center gap-6">
          <div className="relative hidden w-full max-w-[260px] items-center md:flex">
            <span className="absolute left-0 h-2 w-2 rounded-full bg-[#4C0018]"></span>
            <span className="absolute left-4 h-2 w-2 rounded-full bg-[#4C0018]"></span>
            <div className="mx-7 h-[1px] flex-1 bg-[#4C0018]"></div>
            <span className="h-3 w-3 rounded-full bg-[#4C0018]"></span>
          </div>

          <h2 className="whitespace-nowrap text-center font-serif text-3xl text-[#4b4b4b] sm:text-4xl">
            {heading}
          </h2>

          <div className="relative hidden w-full max-w-[260px] items-center md:flex">
            <span className="h-3 w-3 rounded-full bg-[#4C0018]"></span>
            <div className="mx-7 h-[1px] flex-1 bg-[#4C0018]"></div>
            <span className="absolute right-4 h-2 w-2 rounded-full bg-[#4C0018]"></span>
            <span className="absolute right-0 h-2 w-2 rounded-full bg-[#4C0018]"></span>
          </div>
        </div>

        {/* Products Grid */}
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
