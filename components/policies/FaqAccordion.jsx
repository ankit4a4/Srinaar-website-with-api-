"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are usually delivered within 4–7 business days across India, depending on your location. You can track your order anytime from My Account.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "Yes — you can request a return within 7 days of delivery, as long as the item is unused and in its original packaging with tags intact. Visit our Returns & Cancellation page for full details.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes, Cash on Delivery is available on most pin codes. This will be shown as an option at checkout if it's available for your address.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order ships, you'll get a tracking link by email, and you can also check the latest status from My Account → Track Order.",
  },
  {
    q: "Do I need an account to place an order?",
    a: "Yes, we currently ask you to sign in with your Google account so we can keep your orders, cart, and wishlist saved and synced across devices.",
  },
  {
    q: "What sizes do you offer?",
    a: "Sizes vary by product and are listed on each product page, along with a size guide image where available, to help you pick the right fit.",
  },
  {
    q: "How do I know if a color is available in a print/fabric I like?",
    a: "Each product shows the exact color and fabric options available for that particular design — the photo you see for each color swatch is the actual product.",
  },
  {
    q: "How can I contact you for other questions?",
    a: "You can reach us anytime through our Contact page — we usually respond within a business day.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-14 sm:py-20">
      <div className="space-y-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-[#eee3dc] bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium text-[15px] text-[#2e1f1f]">{item.q}</span>
                <FiChevronDown
                  className={`shrink-0 text-[#990027] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-[14px] leading-[1.8] text-[#7d7272]">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
