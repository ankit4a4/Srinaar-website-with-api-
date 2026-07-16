"use client";

import { useDispatch, useSelector } from "react-redux";
import { openLoginPrompt } from "@/lib/redux/uiSlice";
import { selectIsLoggedIn } from "@/lib/redux/authSlice";

/**
 * Usage:
 *   const requireAuth = useRequireAuth();
 *   const handleAddToCart = () => requireAuth(() => addToCart({ product, quantity: 1 }));
 *
 * If the user is logged in, `action()` runs immediately.
 * If not, the login modal opens and `action` is NOT retried automatically —
 * the user simply clicks the button again once they're signed in.
 */
export function useRequireAuth() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (action) => {
    if (!isLoggedIn) {
      dispatch(openLoginPrompt());
      return false;
    }
    action();
    return true;
  };
}
