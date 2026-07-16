"use client";

import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  fileUrl,
} from "@/lib/redux/api";
import { selectIsLoggedIn } from "@/lib/redux/authSlice";
import { useRequireAuth } from "@/lib/redux/useRequireAuth";

export default function Cart() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const requireAuth = useRequireAuth();
  const { data: cart, isLoading } = useGetCartQuery(undefined, { skip: !isLoggedIn });
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [checkoutMsg, setCheckoutMsg] = useState("");

  const cartItems = cart?.items || [];

  const handleIncrease = (item) => {
    updateCartItem({ itemId: item._id, quantity: item.quantity + 1 });
  };

  const handleDecrease = (item) => {
    if (item.quantity <= 1) return;
    updateCartItem({ itemId: item._id, quantity: item.quantity - 1 });
  };

  const handleRemove = (item) => {
    removeCartItem(item._id);
  };

  const summary = useMemo(() => {
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity,
      0
    );
    const shipping = 0;
    const taxes = 0;
    const couponDiscount = 0;
    const total = subtotal + shipping + taxes - couponDiscount;

    return { items, subtotal, shipping, taxes, couponDiscount, total };
  }, [cartItems]);

  const formatPrice = (value) => `₹${(value || 0).toLocaleString("en-IN")}`;

  const handleCheckout = () => {
    requireAuth(() => {
      setCheckoutMsg("Checkout aur payment (Razorpay) ka setup jaldi aa raha hai!");
    });
  };

  if (!isLoggedIn) {
    return (
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h3 className="text-2xl font-semibold text-[#2a1a14]">Login karo pehle</h3>
          <p className="mt-2 text-[#8b6f63]">Apna cart dekhne ke liye Google se sign in karo.</p>
          <button
            onClick={() => requireAuth(() => {})}
            className="mt-6 rounded-full bg-[#990027] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
          >
            Sign In with Google
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className=" py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
          {/* Left Side */}
          <div className="overflow-hidden rounded-[24px] border border-[#eadfd7] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            {/* Header */}
            <div className="hidden grid-cols-[1.7fr_0.7fr_0.8fr_0.8fr] rounded-t-[24px] bg-[#990027] px-8 py-4 text-sm font-medium text-white md:grid">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p className="text-right">Subtotal</p>
            </div>

            {/* Items */}
            <div className="px-4 md:px-6">
              {isLoading && (
                <p className="py-10 text-center text-[#8b6f63]">Loading cart…</p>
              )}

              {!isLoading && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className={`grid gap-4 py-5 md:grid-cols-[1.7fr_0.7fr_0.8fr_0.8fr] md:items-center ${
                      index !== cartItems.length - 1 ? "border-b border-[#eee3dc]" : ""
                    }`}
                  >
                    {/* Product */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleRemove(item)}
                        className="mt-1 h-9 w-9 shrink-0 rounded-full border border-[#e9d8d0] text-[#4b1e1e] transition hover:border-[#990027] hover:bg-[#fff4f7] hover:text-[#990027]"
                      >
                        <FiX className="mx-auto text-[16px]" />
                      </button>

                      <div className="flex min-w-0 items-center gap-4">
                        <div className="relative h-20 w-16 overflow-hidden rounded-xl bg-[#f8f4f1] sm:h-24 sm:w-20">
                          <img
                            src={fileUrl(item.product?.images?.[0]) || "https://placehold.co/200x260?text=Srinaar"}
                            alt={item.product?.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <Link href={`/singleproduct/${item.product?._id}`}>
                            <h3 className="line-clamp-2 text-sm font-semibold text-[#2a1a14] sm:text-[15px]">
                              {item.product?.name}
                            </h3>
                          </Link>
                          <p className="mt-1 text-sm text-[#8b6f63]">
                            {item.size ? `Size: ${item.size}` : ""} {item.color ? `· ${item.color}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between md:block">
                      <span className="text-sm font-medium text-[#7f6d65] md:hidden">Price</span>
                      <p className="text-sm font-semibold text-[#2a1a14] sm:text-[15px]">
                        {formatPrice(item.product?.price)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between md:block">
                      <span className="text-sm font-medium text-[#7f6d65] md:hidden">Quantity</span>

                      <div className="flex w-fit items-center rounded-full border border-[#eadfd7] bg-white p-1 shadow-sm">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-[#4b1e1e] transition hover:bg-[#fff4f7] hover:text-[#990027]"
                        >
                          <FiMinus />
                        </button>

                        <span className="min-w-[34px] text-center text-sm font-semibold text-[#2a1a14]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleIncrease(item)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-[#4b1e1e] transition hover:bg-[#fff4f7] hover:text-[#990027]"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between md:block md:text-right">
                      <span className="text-sm font-medium text-[#7f6d65] md:hidden">Subtotal</span>
                      <p className="text-sm font-bold text-[#2a1a14] sm:text-[15px]">
                        {formatPrice((item.product?.price || 0) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                !isLoading && (
                  <div className="flex min-h-[280px] flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-2xl font-semibold text-[#2a1a14]">Your cart is empty</h3>
                    <p className="mt-2 text-[#8b6f63]">Add some beautiful products to your cart.</p>
                    <Link
                      href="/shop"
                      className="mt-6 rounded-full bg-[#990027] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Side Summary */}
          <div className="h-fit rounded-[24px] border border-[#eadfd7] bg-[#fffdfc] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <h3 className="text-xl font-semibold text-[#2a1a14]">Order Summary</h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-[#7f6d65]">
                <span>Items</span>
                <span className="font-medium text-[#2a1a14]">{summary.items}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-[#7f6d65]">
                <span>Sub Total</span>
                <span className="font-medium text-[#2a1a14]">{formatPrice(summary.subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-[#7f6d65]">
                <span>Shipping</span>
                <span className="font-medium text-[#2a1a14]">{formatPrice(summary.shipping)}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-[#7f6d65]">
                <span>Taxes</span>
                <span className="font-medium text-[#2a1a14]">{formatPrice(summary.taxes)}</span>
              </div>
            </div>

            <div className="my-6 h-px w-full bg-[#eadfd7]" />

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[#2a1a14]">Total</span>
              <span className="text-2xl font-bold text-[#990027]">{formatPrice(summary.total)}</span>
            </div>

            {checkoutMsg && (
              <p className="mt-4 text-sm text-[#990027]">{checkoutMsg}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="mt-6 w-full rounded-full bg-[#990027] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#7f0021] disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
