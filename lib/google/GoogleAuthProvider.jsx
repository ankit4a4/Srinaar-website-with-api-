"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/redux/authSlice";
import { closeLoginPrompt } from "@/lib/redux/uiSlice";
import { useGoogleLoginMutation } from "@/lib/redux/api";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GoogleAuthContext = createContext(null);

export function GoogleAuthProvider({ children }) {
  const [ready, setReady] = useState(() =>
    typeof window !== "undefined" ? Boolean(window.google?.accounts?.id) : false
  );
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const dispatch = useDispatch();
  const [googleLogin] = useGoogleLoginMutation();

  // Load the Google Identity Services script once (skip if already present/loaded)
  useEffect(() => {
    if (typeof window === "undefined" || window.google?.accounts?.id) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  // Initialize once, with a single callback that performs the real login
  useEffect(() => {
    if (!ready || !window.google?.accounts?.id) return;
    if (!GOOGLE_CLIENT_ID) {
      console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID missing — Google login disabled.");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      auto_select: false,
      callback: async (response) => {
        setError("");
        setSigningIn(true);
        try {
          const res = await googleLogin(response.credential).unwrap();
          dispatch(setCredentials({ token: res.token, user: res.user }));
          dispatch(closeLoginPrompt());
        } catch (err) {
          setError(err?.data?.message || "Login failed, please try again.");
        } finally {
          setSigningIn(false);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const renderGoogleButton = (node, options = {}) => {
    if (!ready || !window.google?.accounts?.id || !node) return;
    node.innerHTML = ""; // avoid duplicate buttons on re-render
    window.google.accounts.id.renderButton(node, {
      theme: "outline",
      size: "large",
      width: 260,
      text: "continue_with",
      ...options,
    });
  };

  return (
    <GoogleAuthContext.Provider value={{ ready, error, signingIn, renderGoogleButton }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}

export const useGoogleAuthContext = () => useContext(GoogleAuthContext);

/**
 * Convenience hook: renders the Google button into a ref you control.
 * Usage: const btnRef = useGoogleButton();  →  <div ref={btnRef} />
 */
export function useGoogleButton(options = {}) {
  const ctx = useGoogleAuthContext();
  const ref = useRef(null);

  useEffect(() => {
    if (ctx?.ready && ref.current) {
      ctx.renderGoogleButton(ref.current, options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx?.ready]);

  return ref;
}
