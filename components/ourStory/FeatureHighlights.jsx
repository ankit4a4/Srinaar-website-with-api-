"use client";

import {
  FiTruck,
  FiThumbsUp,
  FiLock,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: <FiTruck />,
    title: "Free Shipping",
    desc: "Enjoy fast and reliable delivery on every order with smooth and hassle-free shipping service.",
  },
  {
    id: 2,
    icon: <FiThumbsUp />,
    title: "Premium Quality",
    desc: "We provide carefully crafted products made with premium quality materials and fine detailing.",
  },
  {
    id: 3,
    icon: <FiLock />,
    title: "Secure Checkout",
    desc: "Your payment and personal details stay protected with our safe and secure checkout process.",
  },
  {
    id: 4,
    icon: <FiRefreshCw />,
    title: "Easy Returns",
    desc: "Not satisfied with your order? We offer a simple and smooth return process for your convenience.",
  },
  {
    id: 5,
    icon: <FiHeadphones />,
    title: "24/7 Support",
    desc: "Our support team is always ready to help you with orders, products, and any assistance you need.",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="w-full bg-[#fff] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#990027] to-[#590c19] flex items-center justify-center text-white text-[22px] shadow-md">
                {item.icon}
              </div>

              <h3 className="mt-4 text-[20px] font-medium text-[#a57a5a] font-serif">
                {item.title}
              </h3>

              <p className="mt-3 text-[13px] leading-6 text-[#9b8a7d] max-w-[200px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;