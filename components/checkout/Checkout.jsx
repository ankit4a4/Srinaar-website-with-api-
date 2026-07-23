"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiLoader, FiCheckCircle, FiMapPin } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  useGetCartQuery,
  useGetAddressesQuery,
  useAddAddressMutation,
  usePlaceOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
  fileUrl,
} from "@/lib/redux/api";
import { selectIsLoggedIn, selectUser } from "@/lib/redux/authSlice";
import { useGoogleButton } from "@/lib/google/GoogleAuthProvider";
import { useRazorpayScript } from "@/lib/utils/useRazorpayScript";
import { notifySuccess, notifyError } from "@/lib/utils/notify";
import AddressForm, { emptyAddressForm } from "@/components/profile/AddressForm";

const formatAddress = (a) =>
  `${a.fullName}, ${a.addressLine1}${a.addressLine2 ? `, ${a.addressLine2}` : ""}, ${a.city}, ${a.state} - ${a.pincode} (Phone: ${a.phone})`;

const formatPrice = (v) => `₹${(v || 0).toLocaleString("en-IN")}`;

export default function Checkout() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const googleButtonRef = useGoogleButton({ width: 260 });

  const { data: cart, isLoading: cartLoading } = useGetCartQuery(undefined, { skip: !isLoggedIn });
  const { data: addresses, isLoading: addressesLoading } = useGetAddressesQuery(undefined, {
    skip: !isLoggedIn,
  });
  const [addAddress, { isLoading: addingAddress }] = useAddAddressMutation();
  const [placeOrder, { isLoading: placingCod }] = usePlaceOrderMutation();
  const [createRazorpayOrder, { isLoading: creatingRzp }] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment, { isLoading: verifyingRzp }] = useVerifyRazorpayPaymentMutation();
  const razorpayReady = useRazorpayScript();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [successOrder, setSuccessOrder] = useState(null);

  const cartItems = cart?.items || [];
  const defaultAddress = addresses?.find((a) => a.isDefault) || addresses?.[0];
  const activeAddressId = selectedAddressId ?? defaultAddress?._id ?? null;
  const activeAddress = addresses?.find((a) => a._id === activeAddressId);

  const summary = useMemo(() => {
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity,
      0
    );
    return { items, subtotal, total: subtotal };
  }, [cartItems]);

  const isProcessing = placingCod || creatingRzp || verifyingRzp;

  const handleAddAddress = async (form) => {
    try {
      const res = await addAddress(form).unwrap();
      setSelectedAddressId(res.address._id);
      setShowAddressForm(false);
      notifySuccess("Address added!");
    } catch (err) {
      notifyError(err?.data?.message || "Could not save address. Please check the fields.");
    }
  };

  const buildOrderItems = () =>
    cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

  const handlePlaceOrder = async () => {
    if (!activeAddress) {
      notifyError("Please select or add a delivery address.");
      return;
    }
    if (cartItems.length === 0) return;

    const items = buildOrderItems();
    const address = formatAddress(activeAddress);

    if (paymentMethod === "COD") {
      try {
        const res = await placeOrder({ items, address }).unwrap();
        setSuccessOrder(res.order);
      } catch (err) {
        notifyError(err?.data?.message || "Could not place order. Please try again.");
      }
      return;
    }

    // Razorpay flow
    if (!razorpayReady) {
      notifyError("Payment gateway is still loading, please wait a moment and try again.");
      return;
    }

    try {
      const res = await createRazorpayOrder({ items }).unwrap();
      const rzp = new window.Razorpay({
        key: res.keyId,
        amount: res.order.amount,
        currency: res.order.currency,
        order_id: res.order.id,
        name: "Srinaar",
        description: "Order Payment",
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: "#990027" },
        handler: async (response) => {
          try {
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items,
              address,
            }).unwrap();
            setSuccessOrder(verifyRes.order);
          } catch (err) {
            notifyError(err?.data?.message || "Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => {
            notifyError("Payment was cancelled.");
          },
        },
      });
      rzp.open();
    } catch (err) {
      notifyError(err?.data?.message || "Could not start payment. Please try again.");
    }
  };

  // ---------- Not logged in ----------
  if (!isLoggedIn) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm rounded-2xl border border-[#eadfd7] bg-white p-10 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <h2 className="font-serif text-3xl text-[#8f0b24]">Checkout</h2>
          <p className="mt-2 text-sm text-[#666]">Sign in with Google to continue to checkout.</p>
          <div className="mt-6 flex justify-center">
            <div ref={googleButtonRef} />
          </div>
        </div>
      </section>
    );
  }

  // ---------- Success state ----------
  if (successOrder) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-[#eadfd7] bg-white p-10 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7ede9]">
            <FiCheckCircle className="text-[36px] text-[#4b6455]" />
          </div>
          <h2 className="mt-5 font-serif text-3xl text-[#8f0b24]">Order Placed!</h2>
          <p className="mt-2 text-sm text-[#666]">
            Your order <strong>{successOrder.orderId}</strong> has been placed successfully.
            {successOrder.paymentMethod === "COD"
              ? " You'll pay cash on delivery."
              : " Your payment was received."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/profile"
              className="rounded-full bg-[#990027] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
            >
              View My Orders
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-[#eadfd7] px-6 py-3 text-sm font-medium text-[#4a3730] transition hover:bg-[#f6f3ee]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Empty cart ----------
  if (!cartLoading && cartItems.length === 0) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
        <h2 className="font-serif text-2xl text-[#2a1a14]">Your cart is empty</h2>
        <p className="mt-2 text-[#8b6f63]">Add some products before checking out.</p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-[#990027] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-serif text-3xl text-[#2a1a14]">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* LEFT: Address + Payment */}
          <div className="space-y-6">
            {/* Address */}
            <div className="rounded-2xl border border-[#eadfd7] bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-serif text-xl text-[#2a1a14]">
                  <FiMapPin /> Delivery Address
                </h2>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-sm font-medium text-[#990027] underline underline-offset-2"
                  >
                    + Add New
                  </button>
                )}
              </div>

              {showAddressForm && (
                <div className="mb-5">
                  <AddressForm
                    initialValues={emptyAddressForm}
                    onSubmit={handleAddAddress}
                    onCancel={() => setShowAddressForm(false)}
                    submitting={addingAddress}
                  />
                </div>
              )}

              {addressesLoading && (
                <div className="space-y-3">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="h-20 animate-pulse rounded-xl bg-[#f3ece6]" />
                  ))}
                </div>
              )}

              {!addressesLoading && addresses?.length === 0 && !showAddressForm && (
                <p className="py-6 text-center text-sm text-[#8b6f63]">
                  No saved addresses yet — add one above to continue.
                </p>
              )}

              <div className="space-y-3">
                {addresses?.map((address) => (
                  <label
                    key={address._id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      activeAddressId === address._id
                        ? "border-[#990027] bg-[#fdf6f7]"
                        : "border-[#eadfd7]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={activeAddressId === address._id}
                      onChange={() => setSelectedAddressId(address._id)}
                      className="mt-1 accent-[#990027]"
                    />
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#f6f1ed] px-2.5 py-0.5 text-xs font-medium text-[#7f1026]">
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="rounded-full bg-[#990027] px-2.5 py-0.5 text-xs font-medium text-white">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 font-semibold text-[#2a1a14]">{address.fullName}</p>
                      <p className="text-[#8b6f63]">
                        {address.addressLine1}
                        {address.addressLine2 ? `, ${address.addressLine2}` : ""}, {address.city},{" "}
                        {address.state} - {address.pincode}
                      </p>
                      <p className="text-[#8b6f63]">Phone: {address.phone}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-[#eadfd7] bg-white p-6">
              <h2 className="mb-4 font-serif text-xl text-[#2a1a14]">Payment Method</h2>

              <div className="space-y-3">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    paymentMethod === "COD" ? "border-[#990027] bg-[#fdf6f7]" : "border-[#eadfd7]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="accent-[#990027]"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-[#2a1a14]">Cash on Delivery</p>
                    <p className="text-[#8b6f63]">Pay with cash when your order arrives.</p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    paymentMethod === "Razorpay" ? "border-[#990027] bg-[#fdf6f7]" : "border-[#eadfd7]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "Razorpay"}
                    onChange={() => setPaymentMethod("Razorpay")}
                    className="accent-[#990027]"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-[#2a1a14]">Pay Online</p>
                    <p className="text-[#8b6f63]">UPI, cards, netbanking &amp; wallets via Razorpay.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="h-fit rounded-2xl border border-[#eadfd7] bg-[#fffdfc] p-6">
            <h2 className="mb-4 font-serif text-xl text-[#2a1a14]">Order Summary</h2>

            <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={fileUrl(item.product?.images?.[0]) || "https://placehold.co/80x100?text=Srinaar"}
                    alt={item.product?.name}
                    className="h-14 w-11 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="line-clamp-1 font-medium text-[#2a1a14]">{item.product?.name}</p>
                    <p className="text-[#8b6f63]">
                      Qty: {item.quantity}
                      {item.size ? ` · ${item.size}` : ""}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#2a1a14]">
                    {formatPrice((item.product?.price || 0) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-5 h-px w-full bg-[#eadfd7]" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#7f6d65]">
                <span>Items</span>
                <span className="font-medium text-[#2a1a14]">{summary.items}</span>
              </div>
              <div className="flex justify-between text-[#7f6d65]">
                <span>Subtotal</span>
                <span className="font-medium text-[#2a1a14]">{formatPrice(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#7f6d65]">
                <span>Shipping</span>
                <span className="font-medium text-[#2a1a14]">Free</span>
              </div>
            </div>

            <div className="my-5 h-px w-full bg-[#eadfd7]" />

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[#2a1a14]">Total</span>
              <span className="text-2xl font-bold text-[#990027]">{formatPrice(summary.total)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !activeAddress}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#990027] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#7f0021] disabled:opacity-50"
            >
              {isProcessing && <FiLoader className="animate-spin text-[16px]" />}
              {isProcessing
                ? "Processing…"
                : paymentMethod === "COD"
                ? "Place Order"
                : "Pay & Place Order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
