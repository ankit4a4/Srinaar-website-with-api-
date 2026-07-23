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

## Update — Profile page fixes

- **Fixed a real bug**: after saving profile details (name, phone, birthday, gender), the change
  now actually persists — it's saved back into Redux + localStorage immediately, and the birthday
  fields correctly show the saved date (locked/disabled) next time you open the page.
- **Delivery Addresses is now fully working** (was a placeholder before) — add, edit, delete, and
  set-default, backed by new backend endpoints (`/api/addresses`).
- Loyalty Points and Change Password remain placeholders — the first has no backend concept yet,
  and the second isn't applicable since login is Google-only.

## Update — Full audit pass (round 3)

Went through every page/component to find anything still not wired up:

- **Header search bar** — was purely decorative before; now typing + pressing Enter takes you
  to `/shop?search=your query`, and the shop page shows a "Search results for..." heading with
  a clear button. Backend's existing `?search=` param on `GET /api/products` powers this.
- **Wishlist icon badge** — the heart icon in the header now shows a live count too, matching
  the cart badge (desktop + mobile).
- **Footer** — "Top Categories" now pulls real categories from the backend; "My Account",
  "Track Order", "My Cart", "Wishlist", "Order History", "Contact us", "About us" are now real
  links. ("FAQs", "Privacy Policy", "Shipping Policy", etc. are left as plain text — those pages
  don't exist yet, so I didn't want fake/dead links.) Social icons link out to placeholder
  handles (`instagram.com/srinaar`, etc.) — swap these for your real profile URLs.
- **New Arrivals** (homepage) — was showing 3 identical hardcoded "Straight Suit" cards with the
  same placeholder image. Now shows your 3 actual latest products.
- **Instagram showcase** (our-story page) — was showing the same placeholder image 6 times in a
  loop. Now shows a real "shop the feed" style gallery of your actual product photos, each
  linking to that product.
- Removed two empty leftover route folders (`app/collection/test`, `app/singleproduct/test`)
  that had no page file and weren't doing anything.

Confirmed intentionally static (no backend concept exists for these, and building one wasn't in
scope): Premium Features badges, Royal Heritage story, Craft Section, Testimonials, top
promotional marquee, and all the small page-header banners (Shop/Cart/Wishlist/Contact/About).

## Update — Round 4 fixes

- **Profile form inputs fixed** — inputs now use solid, explicit styling (2px border, white
  background, clear disabled state) instead of a shared CSS class that could look inconsistent.
  Should now look crisp and visible in every state (typing, focused, disabled).
- **Wishlist heart icon repositioned** — now sits exactly 20px from the bottom and 20px from the
  right of every product image (shared `ProductCard`, so this applies everywhere: home, shop,
  wishlist, recently viewed, "you may also like").
- **Profile page grids capped at 3 columns** — "My Wishlist" and "Recently Viewed" tabs inside
  the profile page were cramped at 4 columns in that narrower layout; now show 3 per row there
  (the standalone `/wishlist` page still shows 4, since it has the full page width).
- **Loyalty Points removed** from the profile sidebar entirely.
- **Homepage login section now disappears once logged in** — no more "Welcome back" card or
  logout button sitting on the homepage; account management now lives entirely on `/profile`.

## Update — Round 5

- **Royal Heritage banner images** are now admin-controlled — the admin panel has a new
  "Banners" page to upload/replace each of the 3 background photos. Falls back to the original
  bundled images until an admin uploads something.
- **Contact form success popup** — submitting the contact form now shows a proper modal
  ("Message Sent! ... we'll get back to you as soon as possible.") instead of just a toast, with
  a close button.
- **Footer** — "Top Categories" capped at 4 (was 5) so it doesn't grow taller than the other
  columns as more categories get added. All footer links now point to real pages.
- **8 new pages built**: Returns & Cancellation (`/returns`), Shipping Policy
  (`/shipping-policy`), Privacy Policy (`/privacy-policy`), Terms of Use (`/terms`), Careers
  (`/careers`), Investor Information (`/investor-information`), Achievements (`/achievements`,
  with a milestone timeline), and FAQs (`/faqs`, with an accordion). All share a common
  `PolicyHero`/`PolicyLayout` design for a consistent, premium look.
- Did **not** build a Store Locator page, per instruction.
- Payment/checkout integration remains deferred, as previously discussed — backend is otherwise
  fully ready; let me know when Razorpay keys are set up and I'll wire it in.

## Update — Round 6: Checkout, Payments, Pagination

- **New `/checkout` page** — select or add a delivery address, choose Cash on Delivery or
  Pay Online (Razorpay), review order summary, place order. Shows a success screen with a link to
  My Orders. Cart's "Proceed to Checkout" now goes here instead of a placeholder message.
- **Razorpay integration** — loads Razorpay's checkout script, creates a server-side order, opens
  the payment popup, and verifies the payment signature before the order is recorded. No frontend
  env var needed for this — the key comes from the backend response.
- **Cash on Delivery** — fully working alternative to online payment, same checkout flow.
- **Shared `AddressForm`** (`components/profile/AddressForm.jsx`) — used by both the Profile
  address book and Checkout, so adding an address works the same way in both places.
- **Real pagination** on the Shop page (12 products/page) and My Orders (5/page in the profile tab)
  instead of fetching large batches in one go. Fixed a related bug: color filters/swatches on the
  shop page were still expecting the old plain-string color format; updated to the new
  `{ value, image }` shape (backend change from an earlier round) — swatches are now small photos
  instead of plain circles.

### Known trade-off
Price/color/size filters on the Shop page are still applied client-side, only within the current
page of results (the backend doesn't support filtering by those yet). This means combining a color
filter with pagination can show fewer results than expected on a given page. If you want these
filters to work across the whole catalog, the backend's `GET /api/products` would need `?color=`,
`?size=`, `?minPrice=`/`?maxPrice=` query support — let me know if you'd like that added.
