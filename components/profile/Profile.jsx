"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiUser,
  FiMapPin,
  FiShoppingBag,
  FiHeart,
  FiClock,
  FiGift,
  FiLock,
  FiLogOut,
  FiLoader,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "@/lib/redux/authSlice";
import { useUpdateProfileMutation, useGetMyOrdersQuery } from "@/lib/redux/api";
import { notifySuccess, notifyError } from "@/lib/utils/notify";
import { useGoogleButton } from "@/lib/google/GoogleAuthProvider";
import WishlistProduct from "@/components/wishlist/WishlistProduct";
import RecentlyViewedGrid from "@/components/profile/RecentlyViewedGrid";

const TABS = [
  { key: "profile", label: "My Profile", icon: FiUser },
  { key: "address", label: "Delivery Address", icon: FiMapPin },
  { key: "orders", label: "My Orders", icon: FiShoppingBag },
  { key: "wishlist", label: "My Wishlist", icon: FiHeart },
  { key: "recent", label: "Recently Viewed", icon: FiClock },
  { key: "loyalty", label: "Loyalty Points", icon: FiGift },
  { key: "password", label: "Change Password", icon: FiLock },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning!";
  if (hour < 17) return "Good Afternoon!";
  return "Good Evening!";
}

function LoggedOutView() {
  const buttonRef = useGoogleButton({ width: 260 });
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-[#eadfd7] bg-white p-10 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
        <h2 className="font-serif text-3xl text-[#8f0b24]">My Account</h2>
        <p className="mt-2 text-sm text-[#666]">Sign in with Google to view your profile.</p>
        <div className="mt-6 flex justify-center">
          <div ref={buttonRef} />
        </div>
      </div>
    </section>
  );
}

export default function Profile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) return <LoggedOutView />;

  return (
    <section className="bg-[#f6f3ee] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* SIDEBAR */}
        <aside className="h-fit rounded-2xl bg-[#f7d9d9]/60 p-5 shadow-sm">
          <div className="flex items-center gap-3 rounded-xl bg-white/70 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7f1026] font-serif text-lg text-white">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-[#2a1a14]">{user.name}</p>
              <p className="text-xs text-[#8b6f63]">
                {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </p>
            </div>
          </div>

          <nav className="mt-4 space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                    active
                      ? "bg-white text-[#7f1026] font-semibold shadow-sm"
                      : "text-[#5c443d] hover:bg-white/50"
                  }`}
                >
                  <Icon className="text-[16px]" />
                  {tab.label}
                </button>
              );
            })}

            <button
              onClick={() => dispatch(logout())}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-[#a63a2e] transition hover:bg-white/50"
            >
              <FiLogOut className="text-[16px]" />
              Log Out
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="rounded-2xl bg-[#f6f3ee] p-2 sm:p-4">
          {activeTab === "profile" && <ProfileForm user={user} />}
          {activeTab === "address" && <ComingSoonCard title="Delivery Addresses" text="Save multiple delivery addresses for a faster checkout. This feature is coming soon." />}
          {activeTab === "orders" && <OrdersPanel />}
          {activeTab === "wishlist" && <WishlistProduct />}
          {activeTab === "recent" && <RecentlyViewedGrid />}
          {activeTab === "loyalty" && <ComingSoonCard title="Loyalty Points" text="Earn points on every order and redeem them for discounts. This feature is coming soon." />}
          {activeTab === "password" && (
            <ComingSoonCard
              title="Change Password"
              text="You're signed in with Google, so there's no password to manage here. Manage your Google account security directly from your Google account settings."
            />
          )}
        </div>
      </div>
    </section>
  );
}

function ProfileForm({ user }) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const nameParts = (user.name || "").split(" ");
  const [form, setForm] = useState({
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    phone: user.phone || "",
    day: "",
    month: "",
    year: "",
    gender: user.gender || "",
  });

  const dobLocked = Boolean(user.dob);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        name: `${form.firstName} ${form.lastName}`.trim(),
        phone: form.phone,
        gender: form.gender,
        dob:
          form.day && form.month && form.year
            ? `${form.year}-${form.month}-${form.day}`
            : undefined,
      }).unwrap();
      notifySuccess("Profile updated successfully!");
    } catch (err) {
      notifyError(err?.data?.message || "Could not update profile. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-center font-serif text-2xl text-[#2a1a14] sm:text-3xl">
        {getGreeting()} {user.name?.split(" ")[0]}
      </h1>

      <form onSubmit={handleSave} className="mx-auto mt-8 max-w-2xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="First Name">
            <input
              value={form.firstName}
              onChange={handleChange("firstName")}
              className="input-field"
            />
          </Field>

          <Field label="Last Name">
            <input
              value={form.lastName}
              onChange={handleChange("lastName")}
              className="input-field"
            />
          </Field>

          <Field label="Email">
            <input value={user.email} disabled className="input-field cursor-not-allowed bg-[#f6f3ee] text-[#8b6f63]" />
          </Field>

          <Field label="Contact Number">
            <input
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="+91 XXXXX XXXXX"
              className="input-field"
            />
          </Field>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-[#4a3730]">
            Birthday{" "}
            {dobLocked && (
              <span className="text-xs font-normal text-[#a63a2e]">(Once set, cannot be changed)</span>
            )}
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input
              placeholder="DD"
              maxLength={2}
              disabled={dobLocked}
              value={form.day}
              onChange={handleChange("day")}
              className="input-field text-center disabled:cursor-not-allowed disabled:bg-[#f6f3ee]"
            />
            <input
              placeholder="MM"
              maxLength={2}
              disabled={dobLocked}
              value={form.month}
              onChange={handleChange("month")}
              className="input-field text-center disabled:cursor-not-allowed disabled:bg-[#f6f3ee]"
            />
            <input
              placeholder="YYYY"
              maxLength={4}
              disabled={dobLocked}
              value={form.year}
              onChange={handleChange("year")}
              className="input-field text-center disabled:cursor-not-allowed disabled:bg-[#f6f3ee]"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-[#4a3730]">Gender</label>
          <div className="flex flex-wrap gap-6">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2 text-sm text-[#4a3730]">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === g}
                  onChange={() => setForm((prev) => ({ ...prev, gender: g }))}
                  className="accent-[#990027]"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#990027] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#7f0021] disabled:opacity-60"
        >
          {isLoading && <FiLoader className="animate-spin text-[15px]" />}
          {isLoading ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

function OrdersPanel() {
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 font-serif text-2xl text-[#2a1a14]">My Orders</h2>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-[#f3ece6]" />
          ))}
        </div>
      )}

      {!isLoading && (!orders || orders.length === 0) && (
        <div className="py-10 text-center">
          <p className="text-[#8b6f63]">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-[#990027] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
          >
            Start Shopping
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#eadfd7] px-5 py-4 text-sm"
          >
            <span className="font-semibold text-[#2a1a14]">{order.orderId}</span>
            <span className="text-[#8b6f63]">
              {new Date(order.createdAt).toLocaleDateString("en-IN")}
            </span>
            <span className="rounded-full bg-[#f6f1ed] px-3 py-1 text-xs font-medium text-[#7f1026]">
              {order.status}
            </span>
            <span className="font-semibold text-[#990027]">
              ₹{order.amount?.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComingSoonCard({ title, text }) {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <h2 className="font-serif text-2xl text-[#2a1a14]">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-[#8b6f63]">{text}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#4a3730]">{label}</label>
      {children}
    </div>
  );
}
