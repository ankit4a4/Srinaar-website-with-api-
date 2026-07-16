"use client";

import { RiStarSmileLine } from "react-icons/ri";
import { RiTruckLine } from "react-icons/ri";
import { RiRefreshLine } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function PremiumFeatures() {
  const features = [
    {
      icon: <RiStarSmileLine size={26} />,
      title: "Premium Quality",
    },
    {
      icon: <RiTruckLine size={26} />,
      title: "Pan India Delivery",
    },
    {
      icon: <RiRefreshLine size={26} />,
      title: "Easy Return",
    },
    {
      icon: <RiSecurePaymentLine size={26} />,
      title: "Secure Checkout",
    },
  ];

  return (
    <section className=" py-16">
      <div className="max-w-6xl mx-auto px-4">

        <div className="bg-gradient-to-r from-red-800 to-[#4C0018] rounded-2xl p-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-white text-center md:text-left"
              >
                {/* Icon */}
                <div className="text-2xl">
                  {item.icon}
                </div>

                {/* Text */}
                <span className="text-sm md:text-md font-medium">
                  {item.title}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}