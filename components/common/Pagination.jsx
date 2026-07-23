"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ page, pages, onPageChange }) {
  if (!pages || pages <= 1) return null;

  const pageNumbers = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(pages, start + 4);
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goTo = (p) => {
    onPageChange(p);
    scrollToTop();
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-1.5">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d2c4] text-[#2d2d2d] transition hover:border-[#8b5e3c] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FiChevronLeft />
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => goTo(1)}
            className="h-10 w-10 rounded-full text-sm text-[#2d2d2d] hover:bg-[#ece7db] transition"
          >
            1
          </button>
          {start > 2 && <span className="text-[#8a776f]">…</span>}
        </>
      )}

      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={`h-10 w-10 rounded-full text-sm transition ${
            p === page ? "bg-[#7f1026] text-white" : "text-[#2d2d2d] hover:bg-[#ece7db]"
          }`}
        >
          {p}
        </button>
      ))}

      {end < pages && (
        <>
          {end < pages - 1 && <span className="text-[#8a776f]">…</span>}
          <button
            onClick={() => goTo(pages)}
            className="h-10 w-10 rounded-full text-sm text-[#2d2d2d] hover:bg-[#ece7db] transition"
          >
            {pages}
          </button>
        </>
      )}

      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= pages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d2c4] text-[#2d2d2d] transition hover:border-[#8b5e3c] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
