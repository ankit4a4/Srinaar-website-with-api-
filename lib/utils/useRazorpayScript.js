"use client";

import { useEffect, useState } from "react";

export function useRazorpayScript() {
  const [ready, setReady] = useState(() =>
    typeof window !== "undefined" ? Boolean(window.Razorpay) : false
  );

  useEffect(() => {
    if (typeof window === "undefined" || window.Razorpay) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, []);

  return ready;
}
