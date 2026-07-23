"use client";

import { useState } from "react";
import { FiLoader } from "react-icons/fi";

export const emptyAddressForm = {
  label: "Home",
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#4a3730]">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-[#e4d9cd] bg-white px-4 py-3 text-sm text-[#2a1a14] outline-none transition-colors duration-200 focus:border-[#990027]";

export default function AddressForm({ initialValues, onSubmit, onCancel, submitting, submitLabel = "Save Address" }) {
  const [form, setForm] = useState(initialValues || emptyAddressForm);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[#eadfd7] p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Label">
          <select value={form.label} onChange={handleChange("label")} className={`${inputClass} bg-white`}>
            <option>Home</option>
            <option>Work</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Full Name">
          <input value={form.fullName} onChange={handleChange("fullName")} className={inputClass} required />
        </Field>
        <Field label="Phone Number">
          <input value={form.phone} onChange={handleChange("phone")} className={inputClass} required />
        </Field>
        <Field label="Pincode">
          <input value={form.pincode} onChange={handleChange("pincode")} className={inputClass} required />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Address Line 1">
            <input value={form.addressLine1} onChange={handleChange("addressLine1")} className={inputClass} required />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Address Line 2 (optional)">
            <input value={form.addressLine2} onChange={handleChange("addressLine2")} className={inputClass} />
          </Field>
        </div>
        <Field label="City">
          <input value={form.city} onChange={handleChange("city")} className={inputClass} required />
        </Field>
        <Field label="State">
          <input value={form.state} onChange={handleChange("state")} className={inputClass} required />
        </Field>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 rounded-full bg-[#990027] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7f0021] disabled:opacity-60"
        >
          {submitting && <FiLoader className="animate-spin text-[14px]" />}
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-[#eadfd7] px-6 py-2.5 text-sm font-medium text-[#4a3730] transition hover:bg-[#f6f3ee]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
