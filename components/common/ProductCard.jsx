"use client";

import Link from "next/link";
import { FiHeart, FiLoader } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery, fileUrl } from "@/lib/redux/api";
import { selectIsLoggedIn } from "@/lib/redux/authSlice";
import { useRequireAuth } from "@/lib/redux/useRequireAuth";
import { notifySuccess, notifyError } from "@/lib/utils/notify";

export default function ProductCard({ product }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const requireAuth = useRequireAuth();
  const [addToWishlist, { isLoading: addingToWishlist }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: removingFromWishlist }] = useRemoveFromWishlistMutation();
  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !isLoggedIn });

  const wishlistIds = new Set((wishlist?.products || []).map((p) => p._id));
  const isInWishlist = wishlistIds.has(product._id);
  const wishlistBusy = addingToWishlist || removingFromWishlist;

  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(async () => {
      try {
        if (isInWishlist) {
          await removeFromWishlist(product._id).unwrap();
          notifySuccess("Removed from wishlist");
        } else {
          await addToWishlist(product._id).unwrap();
          notifySuccess("Added to wishlist!");
        }
      } catch (err) {
        notifyError(err?.data?.message || "Something went wrong. Please try again.");
      }
    });
  };

  return (
    <Link href={`/singleproduct/${product._id}`} className="group block">
      <div className="overflow-hidden">
        {/* Image Wrapper */}
        <div className="relative h-[350px] md:h-[340px] overflow-hidden bg-[#f6f1ed] sm:h-[350px] lg:h-[400px]">
          <img
            src={fileUrl(product.images?.[0]) || "https://placehold.co/600x800?text=Srinaar"}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.06]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

          <button
            type="button"
            onClick={handleWishlist}
            disabled={wishlistBusy}
            className={`absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:bg-[#7f1026] hover:text-white sm:h-11 sm:w-11 ${
              isInWishlist ? "text-[#7f1026] opacity-100 translate-y-0" : "text-[#7f1026]"
            }`}
          >
            {wishlistBusy ? (
              <FiLoader className="animate-spin text-[16px]" />
            ) : (
              <FiHeart className="text-[18px]" fill={isInWishlist ? "currentColor" : "none"} />
            )}
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
            {discountPct > 0 && (
              <span className="rounded-full bg-[#7f1026] px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-white shadow-md sm:text-[11px]">
                {discountPct}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
