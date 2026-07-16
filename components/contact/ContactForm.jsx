"use client";

import { useState } from "react";
import { useSubmitContactMessageMutation } from "@/lib/redux/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    occasion: "",
    budget: "",
    message: "",
  });
  const [submitMessage, { isLoading }] = useSubmitContactMessageMutation();
  const [status, setStatus] = useState(""); // '', 'success', 'error'
  const [statusText, setStatusText] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setStatusText("Naam, email aur message bharna zaroori hai.");
      return;
    }

    const subjectParts = [form.occasion, form.budget].filter(Boolean);
    const subject = subjectParts.length > 0 ? subjectParts.join(" · ") : "Website Enquiry";

    try {
      await submitMessage({
        name: form.name,
        email: form.email,
        subject,
        message: form.message,
      }).unwrap();

      setStatus("success");
      setStatusText("Message bhej diya gaya! Hum jaldi contact karenge.");
      setForm({ name: "", email: "", occasion: "", budget: "", message: "" });
    } catch (err) {
      setStatus("error");
      setStatusText(err?.data?.message || "Kuch galat ho gaya, dubara try karo.");
    }
  };

  return (
    <section className="bg-white py-16 md:py-24  px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center md:mt-[100px] mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2e1f1f]">
            Get In Touch
          </h2>

          <div className="flex justify-center mt-4 mb-5">
            <span className="w-12 h-[2px] bg-[#990027]"></span>
          </div>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-[#7d7272] leading-relaxed">
            Have a question or want to work with us? Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange("name")}
              className="w-full border border-gray-300 rounded-lg px-5 py-3.5 text-base text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#990027] focus:ring-2 focus:ring-[#990027]/20 transition-all duration-300 bg-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full border border-gray-300 rounded-lg px-5 py-3.5 text-base text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#990027] focus:ring-2 focus:ring-[#990027]/20 transition-all duration-300 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <select
              value={form.occasion}
              onChange={handleChange("occasion")}
              className="w-full border border-gray-300 rounded-lg px-5 py-3.5 text-base text-gray-700 outline-none focus:border-[#990027] focus:ring-2 focus:ring-[#990027]/20 transition-all duration-300 bg-white cursor-pointer"
            >
              <option value="">Select Occasion</option>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Corporate Event</option>
              <option>Other</option>
            </select>

            <select
              value={form.budget}
              onChange={handleChange("budget")}
              className="w-full border border-gray-300 rounded-lg px-5 py-3.5 text-base text-gray-700 outline-none focus:border-[#990027] focus:ring-2 focus:ring-[#990027]/20 transition-all duration-300 bg-white cursor-pointer"
            >
              <option value="">Select Budget</option>
              <option>Below ₹10,000</option>
              <option>₹10,000 - ₹25,000</option>
              <option>₹25,000 - ₹50,000</option>
              <option>₹50,000 - ₹1,00,000</option>
              <option>Above ₹1,00,000</option>
            </select>
          </div>

          <div className="mb-4">
            <textarea
              rows={5}
              placeholder="Tell us about your requirements..."
              value={form.message}
              onChange={handleChange("message")}
              className="w-full border border-gray-300 rounded-lg px-5 py-3.5 text-base text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#990027] focus:ring-2 focus:ring-[#990027]/20 transition-all duration-300 resize-none bg-white"
            ></textarea>
          </div>

          {status && (
            <p className={`mb-4 text-sm ${status === "success" ? "text-green-700" : "text-red-600"}`}>
              {statusText}
            </p>
          )}

          <div className="flex justify-center md:justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#990027] hover:bg-[#7a0020] text-white text-sm tracking-[1px] uppercase px-8 py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium disabled:opacity-60"
            >
              {isLoading ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
