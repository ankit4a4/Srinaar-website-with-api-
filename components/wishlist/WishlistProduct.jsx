"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "@/lib/redux/api";
import { selectIsLoggedIn } from "@/lib/redux/authSlice";
import { useRequireAuth } from "@/lib/redux/useRequireAuth";
import ProductCard from "@/components/common/ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";

const WishlistProduct = ({ compact = false }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const requireAuth = useRequireAuth();
  const { data: wishlist, isLoading } = useGetWishlistQuery(undefined, { skip: !isLoggedIn });

  const products = wishlist?.products || [];

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl py-16 mx-auto px-4 text-center">
        <h3 className="text-2xl font-semibold text-[#2a1a14]">Please sign in</h3>
        <p className="mt-2 text-[#8b6f63]">Sign in with Google to view your wishlist.</p>
        <button
          onClick={() => requireAuth(() => {})}
          className="mt-6 rounded-full bg-[#990027] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "max-w-7xl py-8 md:py-20 mx-auto px-4 sm:px-6 lg:px-8"}>
      {!isLoading && products.length === 0 && (
        <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-semibold text-[#2a1a14]">Your wishlist is empty</h3>
          <p className="mt-2 text-[#8b6f63]">Tap the heart icon on any product to save it here.</p>
          <Link
            href="/shop"
            className="mt-6 rounded-full bg-[#990027] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      <div
        className={
          compact
            ? "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3"
            : "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 lg:grid-cols-4 lg:gap-x-6"
        }
      >
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistProduct;
