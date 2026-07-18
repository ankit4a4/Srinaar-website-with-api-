"use client";

import { useMemo } from "react";
import { useGetProductsQuery } from "@/lib/redux/api";
import { getRecentlyViewedIds } from "@/lib/utils/recentlyViewed";
import ProductCard from "@/components/common/ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";

export default function RecentlyViewedGrid() {
  const { data, isLoading } = useGetProductsQuery({ limit: 40 });
  const allProducts = data?.products || [];

  const products = useMemo(() => {
    const viewedIds = getRecentlyViewedIds();
    const byId = new Map(allProducts.map((p) => [p._id, p]));
    return viewedIds.map((id) => byId.get(id)).filter(Boolean);
  }, [allProducts]);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 font-serif text-2xl text-[#2a1a14]">Recently Viewed</h2>

      {!isLoading && products.length === 0 && (
        <p className="py-10 text-center text-[#8b6f63]">
          You haven&apos;t viewed any products yet — browse the shop to see them here.
        </p>
      )}

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
