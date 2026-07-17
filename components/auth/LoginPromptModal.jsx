"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { closeLoginPrompt } from "@/lib/redux/uiSlice";
import { useGoogleAuthContext, useGoogleButton } from "@/lib/google/GoogleAuthProvider";

export default function LoginPromptModal() {
  const open = useSelector((state) => state.ui.loginPromptOpen);
  const dispatch = useDispatch();
  const ctx = useGoogleAuthContext();
  const buttonRef = useGoogleButton({ width: 280 });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <button
          onClick={() => dispatch(closeLoginPrompt())}
          className="absolute right-5 top-5 text-[#666] hover:text-black"
        >
          <FiX size={20} />
        </button>

        <h3 className="font-serif text-2xl text-[#8f0b24]">Sign in required</h3>
        <p className="mt-2 text-sm text-[#666]">
          Please sign in with Google to use your cart, wishlist and orders.
        </p>

        {ctx?.error && <p className="mt-3 text-sm text-red-600">{ctx.error}</p>}

        <div className="mt-6 flex justify-center">
          <div ref={buttonRef} />
        </div>

        {ctx?.signingIn && (
          <p className="mt-3 text-xs text-[#999]">Signing in…</p>
        )}
      </div>
    </div>
  );
}
