"use client";

const STORAGE_KEY = "srinaar_recently_viewed";
const MAX_ITEMS = 12;

/** Records that a product was viewed — call this from the product detail page. */
export function trackProductView(productId) {
  if (typeof window === "undefined" || !productId) return;
  try {
    const existing = getRecentlyViewedIds();
    const updated = [productId, ...existing.filter((id) => id !== productId)].slice(
      0,
      MAX_ITEMS
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage might be unavailable (private browsing, etc.) — safe to ignore
  }
}

/** Returns an array of product IDs, most-recently-viewed first. */
export function getRecentlyViewedIds() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
