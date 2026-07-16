"use client";

import { FaStar } from "react-icons/fa6";

export default function TopMarquee() {
  const offers = [
    "Get 50% OFF on your first order",
    "Get 50% OFF on your first order",
    "Get 50% OFF on your first order",
    "Get 50% OFF on your first order",
    "Get 50% OFF on your first order",
  ];

  const loop = [...offers, ...offers];

  return (
    <>
      <div className="w-full overflow-hidden bg-gradient-to-r from-[#8b0020] via-[#c4002b] to-[#8b0020]">
        <div className="flex w-max marquee hover:[animation-play-state:paused]">
          {loop.map((text, i) => (
            <div
              key={i}
              className="flex items-center shrink-0 whitespace-nowrap py-[6px] text-[12px] sm:text-[13px] font-medium text-white tracking-wide"
            >
              <span className="mx-6 text-lg">{text}</span>
              <FaStar size={15} className="text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Smooth Animation */}
      <style jsx global>{`
        .marquee {
          display: flex;
          animation: marqueeAnim 22s linear infinite;
          will-change: transform;
        }

        @keyframes marqueeAnim {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </>
  );
}