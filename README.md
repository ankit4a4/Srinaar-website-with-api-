# Srinaar Website (Next.js)

Aapka existing design as-is rakha gaya hai — sirf backend se live data, Redux Toolkit + RTK Query se
data flow, aur Google login wire kiya gaya hai.

## Setup

```bash
npm install
cp .env.local.example .env.local
```

`.env.local` me fill karo:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

Google Cloud Console ke Authorized JavaScript origins me is website ka URL add karna mat bhoolna
(local: `http://localhost:3001` ya jo bhi port ho, aur live domain).

```bash
npm run dev
```

## Kya-kya wire kiya gaya hai

| Area | Kya connect hua |
|---|---|
| **Header dropdown** | "Collections" ab live backend categories + subcategories dikhata hai (mega menu, main category → uski sub-categories). Mobile accordion bhi same data use karta hai. |
| **Homepage** | `RecommendedProducts` real products dikhata hai. `SignatureCollections` real main categories dikhata hai (thumbnail = us category ka pehla product image). |
| **Shop page (`/shop`)** | Products backend se aate hain. Category filter backend se hota hai; price/color/size filter frontend pe (client-side) apply hota hai kyunki backend abhi wo query support nahi karta. |
| **Collection pages (`/collection/[id]`)** | Header dropdown se click karke us specific category ke products dikhate hain. |
| **Single Product (`/singleproduct/[id]`)** | Real product data, images, sizes, colors, size-guide image (agar admin ne upload ki ho), Add to Cart / Buy Now / Wishlist sab functional. |
| **Cart (`/cart`)** | Real cart — add/remove/update quantity, backend se sync. |
| **Wishlist (`/wishlist`)** | Real wishlist — add/remove, backend se sync. |
| **Contact form** | Backend `/api/messages` pe submit hota hai — admin panel me aur email dono jagah dikhega. |
| **Login/Signup section (homepage + `/profile`)** | Design same hai. Email/password fields sirf visual hain (disabled) kyunki backend sirf Google login support karta hai. Google button ab real hai — sign in karne pe turant "Welcome back" card + recent orders dikhta hai. |
| **Any cart/wishlist/order action while logged out** | Login-required popup khulta hai (Google button ke saath) — login karte hi wapas apna kaam kar sakte ho. |

## Kya abhi wired NAHI hai (jaisa discuss hua)

- **Payment / Checkout** — "Proceed to Checkout" button abhi ek message dikhata hai. Jaise hi Razorpay
  keys ready ho, bata dena, checkout flow + payment yahi complete karenge.
- `NewArrivals`, `CraftSection`, `RoyalHeritage`, `TestimonialSlider`, `InstagramShowcase` — ye purely
  decorative/marketing sections hain, static content rakha hai. Chaho to inhe bhi real data se wire kar
  sakte hain — bata dena.

## Redux structure

```
lib/redux/
  store.js          — configureStore
  api.js             — RTK Query: sabhi backend endpoints (products, categories, cart, wishlist, auth, orders, messages)
  authSlice.js       — token + user, localStorage me persist hota hai
  uiSlice.js         — login-required modal ka open/close state
  useRequireAuth.js  — hook: guest action try kare to login modal khol deta hai
  ReduxProvider.jsx  — root Provider + session restore on load

lib/google/
  GoogleAuthProvider.jsx — Google Identity Services ka single source of truth (script load,
                            initialize, real login mutation call)
```

## Notes

- `npm run lint` do jagah `react-hooks/set-state-in-effect` jaisa naya strict warning de sakta hai agar
  aage koi naya effect add karo — pattern ko dhyan me rakhna: state ko effect me set karne ke bajaye,
  jahan possible ho, derived value use karo (jaisa `SingleProduct.jsx` me kiya gaya hai).
- Product/cart/wishlist images backend ke `/uploads/...` path se load hoti hain (`fileUrl()` helper,
  `lib/redux/api.js` me) — plain `<img>` tags use kiye hain instead of `next/image` kyunki backend host
  arbitrary ho sakta hai.
- Fonts Google Fonts se build time pe fetch hoti hain (`next/font`) — build machine par internet chahiye.

## Update — Round 2 fixes

- **Header dropdown** — rebuilt as a classic two-level dropdown: main categories open directly below "Collections", hover a main category to fly out its subcategories to the right. "View All Products" link removed.
- **Cart badge** — the cart icon in the header now shows a live item count (desktop + mobile).
- **Consistent product cards** — every product grid (home, shop, wishlist, recently viewed, "you may also like") now uses one shared `components/common/ProductCard.jsx`.
- **All UI text in English.**
- **Toast notifications** (`react-toastify`) — add to cart, wishlist, contact form, and order actions all show a proper toast instead of inline text. Styled to match the brand (`lib/utils/notify.js`).
- **Inline loaders, not full-page spinners** — every action button (add to cart, wishlist heart, quantity +/-, remove) shows a small spinner while its request is in flight. Product grids show skeleton placeholders while loading instead of a blocking page-level loader.
- **Recently Viewed** — tracked in `localStorage` (`lib/utils/recentlyViewed.js`); shows the user's real recently-viewed products once they've viewed something, and falls back to the latest products before that.
- **Profile page** (`/profile`) — full account dashboard: profile details form (first/last name, email, phone, birthday, gender), My Orders, My Wishlist, Recently Viewed, and placeholders for Delivery Address / Loyalty Points (not built on the backend yet) and Change Password (not applicable — Google-only login).
- **Product colors** — swatches now support both today's plain color/hex strings *and* a future `{ value, image }` shape per color. When an image is provided, clicking that swatch also updates the main product photo on the single-product page.

### Backend fields this will need later (when you hand over the backend code again)

- `User`: `dob`, `gender` (profile form already sends these; harmless no-ops until the schema/route accepts them)
- `Product.colors`: optionally support `[{ value, image }]` instead of plain strings, to enable the image-swatch feature
- Nothing else changed on the API contract — all existing endpoints are used as-is.
