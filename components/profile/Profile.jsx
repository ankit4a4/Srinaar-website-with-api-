"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiUser,
  FiMapPin,
  FiShoppingBag,
  FiHeart,
  FiClock,
  FiLock,
  FiLogOut,
  FiLoader,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout, updateUser } from "@/lib/redux/authSlice";
import { useUpdateProfileMutation, useGetMyOrdersQuery, useGetAddressesQuery, useAddAddressMutation, useUpdateAddressMutation, useSetDefaultAddressMutation, useDeleteAddressMutation } from "@/lib/redux/api";
import { notifySuccess, notifyError } from "@/lib/utils/notify";
import { useGoogleButton } from "@/lib/google/GoogleAuthProvider";
import WishlistProduct from "@/components/wishlist/WishlistProduct";
import RecentlyViewedGrid from "@/components/profile/RecentlyViewedGrid";
import Pagination from "@/components/common/Pagination";
import AddressForm, { emptyAddressForm } from "@/components/profile/AddressForm";

const TABS = [
  { key: "profile", label: "My Profile", icon: FiUser },
  { key: "address", label: "Delivery Address", icon: FiMapPin },
  { key: "orders", label: "My Orders", icon: FiShoppingBag },
  { key: "wishlist", label: "My Wishlist", icon: FiHeart },
  { key: "recent", label: "Recently Viewed", icon: FiClock },
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
          {activeTab === "address" && <AddressBook />}
          {activeTab === "orders" && <OrdersPanel />}
          {activeTab === "wishlist" && <WishlistProduct compact />}
          {activeTab === "recent" && <RecentlyViewedGrid />}
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
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const nameParts = (user.name || "").split(" ");
  const existingDob = user.dob ? new Date(user.dob) : null;

  const [form, setForm] = useState({
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    phone: user.phone || "",
    day: existingDob ? String(existingDob.getDate()).padStart(2, "0") : "",
    month: existingDob ? String(existingDob.getMonth() + 1).padStart(2, "0") : "",
    year: existingDob ? String(existingDob.getFullYear()) : "",
    gender: user.gender || "",
  });

  const dobLocked = Boolean(user.dob);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        name: `${form.firstName} ${form.lastName}`.trim(),
        phone: form.phone,
        gender: form.gender,
        dob:
          !dobLocked && form.day && form.month && form.year
            ? `${form.year}-${form.month}-${form.day}`
            : undefined,
      }).unwrap();

      // Keep Redux + localStorage in sync with what was actually saved,
      // otherwise the form would appear to "reset" on next visit/refresh.
      dispatch(updateUser(res.user));
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
              className="w-full rounded-xl border-2 border-[#e4d9cd] bg-white px-4 py-3 text-sm text-[#2a1a14] outline-none transition-colors duration-200 focus:border-[#990027] disabled:cursor-not-allowed disabled:bg-[#f6f3ee] disabled:text-[#8b6f63]"
            />
          </Field>

          <Field label="Last Name">
            <input
              value={form.lastName}
              onChange={handleChange("lastName")}
              className="w-full rounded-xl border-2 border-[#e4d9cd] bg-white px-4 py-3 text-sm text-[#2a1a14] outline-none transition-colors duration-200 focus:border-[#990027] disabled:cursor-not-allowed disabled:bg-[#f6f3ee] disabled:text-[#8b6f63]"
            />
          </Field>

          <Field label="Email">
            <input value={user.email} disabled className="w-full rounded-xl border-2 border-[#e4d9cd] bg-white px-4 py-3 text-sm text-[#2a1a14] outline-none transition-colors duration-200 focus:border-[#990027] disabled:cursor-not-allowed disabled:bg-[#f6f3ee] disabled:text-[#8b6f63]" />
          </Field>

          <Field label="Contact Number">
            <input
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-xl border-2 border-[#e4d9cd] bg-white px-4 py-3 text-sm text-[#2a1a14] outline-none transition-colors duration-200 focus:border-[#990027] disabled:cursor-not-allowed disabled:bg-[#f6f3ee] disabled:text-[#8b6f63]"
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
              className="w-full rounded-xl border-2 border-[#e4d9cd] bg-white px-4 py-3 text-sm text-[#2a1a14] outline-none transition-colors duration-200 focus:border-[#990027] disabled:cursor-not-allowed disabled:bg-[#f6f3ee] disabled:text-[#8b6f63] text-center"
            />
            <input
              placeholder="MM"
              maxLength={2}
              disabled={dobLocked}
              value={form.month}
              onChange={handleChange("month")}
              className="w-full rounded-xl border-2 border-[#e4d9cd] bg-white px-4 py-3 text-sm text-[#2a1a14] outline-none transition-colors duration-200 focus:border-[#990027] disabled:cursor-not-allowed disabled:bg-[#f6f3ee] disabled:text-[#8b6f63] text-center"
            />
            <input
              placeholder="YYYY"
              maxLength={4}
              disabled={dobLocked}
              value={form.year}
              onChange={handleChange("year")}
              className="w-full rounded-xl border-2 border-[#e4d9cd] bg-white px-4 py-3 text-sm text-[#2a1a14] outline-none transition-colors duration-200 focus:border-[#990027] disabled:cursor-not-allowed disabled:bg-[#f6f3ee] disabled:text-[#8b6f63] text-center"
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
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyOrdersQuery({ page, limit: 5 });
  const orders = data?.orders || [];

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

      {!isLoading && orders.length === 0 && (
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
        {orders.map((order) => (
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
            <span className="text-xs text-[#8b6f63]">
              {order.paymentMethod} · {order.paymentStatus}
            </span>
            <span className="font-semibold text-[#990027]">
              ₹{order.amount?.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      {!isLoading && data?.pages > 1 && (
        <Pagination page={page} pages={data.pages} onPageChange={setPage} />
      )}
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

function AddressBook() {
  const { data: addresses, isLoading } = useGetAddressesQuery();
  const [addAddress, { isLoading: adding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
  const [setDefaultAddress] = useSetDefaultAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const openAddForm = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const openEditForm = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (editingAddress) {
        await updateAddress({ id: editingAddress._id, ...form }).unwrap();
        notifySuccess("Address updated!");
      } else {
        await addAddress(form).unwrap();
        notifySuccess("Address added!");
      }
      setShowForm(false);
    } catch (err) {
      notifyError(err?.data?.message || "Could not save address. Please check the fields.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id).unwrap();
      notifySuccess("Address removed");
    } catch (err) {
      notifyError(err?.data?.message || "Could not remove address.");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id).unwrap();
      notifySuccess("Default address updated");
    } catch (err) {
      notifyError(err?.data?.message || "Could not update default address.");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-[#2a1a14]">Delivery Addresses</h2>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="rounded-full bg-[#990027] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7f0021]"
          >
            + Add Address
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8">
          <AddressForm
            initialValues={
              editingAddress
                ? {
                    label: editingAddress.label,
                    fullName: editingAddress.fullName,
                    phone: editingAddress.phone,
                    addressLine1: editingAddress.addressLine1,
                    addressLine2: editingAddress.addressLine2 || "",
                    city: editingAddress.city,
                    state: editingAddress.state,
                    pincode: editingAddress.pincode,
                  }
                : emptyAddressForm
            }
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            submitting={adding || updating}
            submitLabel={editingAddress ? "Update Address" : "Save Address"}
          />
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-[#f3ece6]" />
          ))}
        </div>
      )}

      {!isLoading && addresses?.length === 0 && !showForm && (
        <p className="py-10 text-center text-[#8b6f63]">
          No saved addresses yet. Add one for a faster checkout.
        </p>
      )}

      <div className="space-y-3">
        {addresses?.map((address) => (
          <div
            key={address._id}
            className={`rounded-xl border p-5 ${
              address.isDefault ? "border-[#990027]" : "border-[#eadfd7]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#f6f1ed] px-3 py-0.5 text-xs font-medium text-[#7f1026]">
                    {address.label}
                  </span>
                  {address.isDefault && (
                    <span className="rounded-full bg-[#990027] px-3 py-0.5 text-xs font-medium text-white">
                      Default
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold text-[#2a1a14]">{address.fullName}</p>
                <p className="text-sm text-[#8b6f63]">
                  {address.addressLine1}
                  {address.addressLine2 ? `, ${address.addressLine2}` : ""}, {address.city},{" "}
                  {address.state} - {address.pincode}
                </p>
                <p className="text-sm text-[#8b6f63]">Phone: {address.phone}</p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2 text-xs">
                <button
                  onClick={() => openEditForm(address)}
                  className="font-medium text-[#7f1026] underline underline-offset-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="font-medium text-[#a63a2e] underline underline-offset-2"
                >
                  Remove
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address._id)}
                    className="font-medium text-[#4a3730] underline underline-offset-2"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
