"use client";

import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useGetWishlistQuery, useRemoveFromWishlistMutation, fileUrl } from "@/lib/redux/api";
import { selectIsLoggedIn } from "@/lib/redux/authSlice";
import { useRequireAuth } from "@/lib/redux/useRequireAuth";

const WishlistProduct = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const requireAuth = useRequireAuth();
  const { data: wishlist, isLoading } = useGetWishlistQuery(undefined, { skip: !isLoggedIn });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const products = wishlist?.products || [];

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl py-16 mx-auto px-4 text-center">
        <h3 className="text-2xl font-semibold text-[#2a1a14]">Login karo pehle</h3>
        <p className="mt-2 text-[#8b6f63]">Apni wishlist dekhne ke liye Google se sign in karo.</p>
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
    <div className="max-w-7xl py-8 md:py-20 mx-auto px-4 sm:px-6 lg:px-8">
      {isLoading && <p className="text-center text-[#8b6f63]">Loading wishlist…</p>}

      {!isLoading && products.length === 0 && (
        <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-semibold text-[#2a1a14]">Wishlist khaali hai</h3>
          <p className="mt-2 text-[#8b6f63]">Products ko heart icon se wishlist me add karo.</p>
          <Link
            href="/shop"
            className="mt-6 rounded-full bg-[#990027] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 lg:grid-cols-4 lg:gap-x-6">
        {products.map((product) => (
          <Link key={product._id} href={`/singleproduct/${product._id}`} className="group block">
            <div className="overflow-hidden">
              {/* Image Wrapper */}
              <div className="relative h-[350px] md:h-[340px] overflow-hidden  bg-[#f6f1ed] sm:h-[350px] lg:h-[400px]">
                <img
                  src={fileUrl(product.images?.[0]) || "https://placehold.co/600x800?text=Srinaar"}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.06]"
                />

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>

                {/* Remove from Wishlist */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(product._id);
                  }}
                  title="Remove from wishlist"
                  className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#990027] shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 sm:h-11 sm:w-11"
                >
                  <FiHeart className="text-[18px]" fill="currentColor" />
                </button>
              </div>

              {/* Content */}
              <div className="px-1 pt-4">
                <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9a9a9a]">
                  {product.category?.name}
                </p>

                <h3 className="line-clamp-2 min-h-[48px] font-serif text-[16px] leading-[1.4] text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#7f1026] sm:text-[18px]">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-end gap-2">
                  <span className="text-[22px] font-semibold leading-none text-[#1f1f1f] sm:text-[26px]">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </span>

                  {product.oldPrice && (
                    <span className="pb-[2px] text-[13px] text-[#9a9a9a] line-through">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WishlistProduct;
