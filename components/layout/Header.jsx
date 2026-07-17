"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiChevronRight,
} from "react-icons/fi";
import Image from "next/image";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery, useGetCartQuery } from "@/lib/redux/api";
import { selectIsLoggedIn, selectUser } from "@/lib/redux/authSlice";

const staticMenuItems = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
];

const staticEndItems = [
  { name: "Our Story", link: "/our-story" },
  { name: "Contact", link: "/contact" },
];

const iconLinks = {
  wishlist: "/wishlist",
  cart: "/cart",
};

const menuClass =
  "relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full";

/**
 * Classic two-level dropdown for "Collections":
 * - Opens directly below the nav item
 * - Lists main categories vertically
 * - Hovering a main category flies out its subcategories to the right
 */
function CollectionsDropdown({ open, setOpen, categories, loading, textColor, underlineColor }) {
  const [manualActiveMain, setManualActiveMain] = useState(null);
  const hasCategories = categories && categories.length > 0;

  // Default to the first category until the user hovers a different one —
  // avoids syncing state from a prop/derived value inside an effect.
  const activeMain = open ? manualActiveMain ?? categories?.[0]?._id ?? null : null;
  const currentMain = categories?.find((c) => c._id === activeMain);

  const handleClose = () => {
    setOpen(false);
    setManualActiveMain(null);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={handleClose}
    >
      <button className={`${menuClass} ${underlineColor} flex items-center gap-1 ${textColor}`}>
        Collections
        <FiChevronDown className="text-[13px]" />
      </button>

      <div
        className={`absolute top-full left-0 pt-3 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          {/* LEFT: main categories */}
          <div className="w-[220px] border-r border-black/5 py-2">
            {loading && (
              <p className="px-5 py-3 text-sm text-[#8a776f]">Loading…</p>
            )}

            {!loading && !hasCategories && (
              <p className="px-5 py-3 text-sm text-[#8a776f]">No categories yet.</p>
            )}

            {!loading &&
              categories?.map((main) => (
                <Link
                  key={main._id}
                  href={`/collection/${main._id}`}
                  onMouseEnter={() => setManualActiveMain(main._id)}
                  className={`flex items-center justify-between px-5 py-3 text-[14px] transition-colors ${
                    activeMain === main._id
                      ? "bg-[#f6f1ed] text-[#7f1026] font-medium"
                      : "text-[#2d2d2d] hover:bg-[#f6f1ed] hover:text-[#7f1026]"
                  }`}
                >
                  <span>{main.name}</span>
                  {main.subCategories?.length > 0 && <FiChevronRight className="text-[12px]" />}
                </Link>
              ))}
          </div>

          {/* RIGHT: subcategories flyout */}
          {currentMain?.subCategories?.length > 0 && (
            <div className="w-[220px] py-2">
              {currentMain.subCategories.map((sub) => (
                <Link
                  key={sub._id}
                  href={`/collection/${sub._id}`}
                  className="block px-5 py-2.5 text-[13.5px] text-[#333] transition-colors hover:bg-[#f6f1ed] hover:text-[#7f1026]"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileDropdown({ iconColor = "text-white" }) {
  return (
    <div className="relative">
      <Link href="/profile">
        <button className="flex items-center gap-1 cursor-pointer">
          <FiUser className={`text-xl ${iconColor}`} />
        </button>
      </Link>
    </div>
  );
}

function CartIcon({ count, className = "text-xl text-white" }) {
  return (
    <Link href={iconLinks.cart} className="relative inline-flex">
      <FiShoppingBag className={`cursor-pointer ${className}`} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#c9a227] px-1 text-[10px] font-semibold leading-none text-white shadow">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

function DesktopNav({
  collectionsOpen,
  setCollectionsOpen,
  categories,
  categoriesLoading,
  isTransparentState,
  cartCount,
}) {
  return (
    <div className="hidden md:flex items-center justify-between gap-6">
      {/* LEFT */}
      <div className="flex items-center gap-7 text-[15px] font-medium text-white">
        {staticMenuItems.map((item, index) => (
          <Link key={index} href={item.link} className={`${menuClass} after:bg-white text-white`}>
            {item.name}
          </Link>
        ))}

        <CollectionsDropdown
          open={collectionsOpen}
          setOpen={setCollectionsOpen}
          categories={categories}
          loading={categoriesLoading}
          textColor="text-white"
          underlineColor="after:bg-white"
        />

        {staticEndItems.map((item, index) => (
          <Link key={index} href={item.link} className={`${menuClass} after:bg-white text-white`}>
            {item.name}
          </Link>
        ))}
      </div>

      {/* CENTER LOGO */}
      <div className="shrink-0 flex justify-center">
        <Link href="/">
          <Image
            src={isTransparentState ? logo : logo2}
            alt="logo"
            className={
              isTransparentState
                ? "w-[145px] h-auto object-contain"
                : "h-[50px] w-auto object-contain"
            }
            priority
          />
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-5 text-white">
        <div className="hidden lg:flex items-center border border-white/40 rounded-full px-4 py-1.5 w-[220px] transition-all duration-300 group focus-within:bg-white">
          <input
            placeholder="Search"
            className="bg-transparent outline-none text-sm w-full text-white placeholder-white focus:text-black focus:placeholder-gray-500"
          />
          <FiSearch className="ml-2 text-white transition-colors duration-300 group-focus-within:text-black" />
        </div>

        <Link href={iconLinks.wishlist}>
          <button className="group rounded-full border border-transparent p-2 transition-all duration-300 hover:border-white hover:bg-white hover:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]">
            <FiHeart className="text-xl text-white transition-colors duration-300 group-hover:text-[#990027]" />
          </button>
        </Link>

        <ProfileDropdown iconColor="text-white" />

        <CartIcon count={cartCount} />
      </div>
    </div>
  );
}

function MobileTopBar({ setMobileMenu, isTransparentState, cartCount }) {
  return (
    <div className="flex md:hidden items-center justify-between text-white">
      <FiMenu className="text-2xl cursor-pointer" onClick={() => setMobileMenu(true)} />

      <Link href="/">
        <Image
          src={isTransparentState ? logo : logo2}
          alt="logo"
          className="w-full h-[50px] object-contain"
          priority
        />
      </Link>

      <CartIcon count={cartCount} />
    </div>
  );
}

function HeaderContent({
  collectionsOpen,
  setCollectionsOpen,
  categories,
  categoriesLoading,
  setMobileMenu,
  isTransparentState,
  cartCount,
}) {
  return (
    <div className="px-4 lg:px-6">
      <DesktopNav
        collectionsOpen={collectionsOpen}
        setCollectionsOpen={setCollectionsOpen}
        categories={categories}
        categoriesLoading={categoriesLoading}
        isTransparentState={isTransparentState}
        cartCount={cartCount}
      />
      <MobileTopBar
        setMobileMenu={setMobileMenu}
        isTransparentState={isTransparentState}
        cartCount={cartCount}
      />
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isTransparentState = isHomePage && !scrolled;

  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const { data: cart } = useGetCartQuery(undefined, { skip: !isLoggedIn });
  const cartCount = (cart?.items || []).reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NORMAL HEADER */}
      <header className={isHomePage ? "absolute top-0 left-0 w-full z-40" : "relative w-full z-40"}>
        <div
          className={`${
            isTransparentState ? "bg-transparent py-5" : "bg-gradient-to-b from-[#990027] to-[#590c19] py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <HeaderContent
              collectionsOpen={collectionsOpen}
              setCollectionsOpen={setCollectionsOpen}
              categories={categories}
              categoriesLoading={categoriesLoading}
              setMobileMenu={setMobileMenu}
              isTransparentState={isTransparentState}
              cartCount={cartCount}
            />
          </div>
        </div>
      </header>

      {/* SCROLL HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div
          className={`px-4 pt-4 transition-all duration-500 ease-out ${
            scrolled ? "translate-y-0 opacity-100" : "-translate-y-[140%] opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto pointer-events-auto rounded-2xl bg-gradient-to-b from-[#990027] to-[#590c19] shadow-[0_10px_40px_rgba(0,0,0,0.20)] py-3">
            <HeaderContent
              collectionsOpen={collectionsOpen}
              setCollectionsOpen={setCollectionsOpen}
              categories={categories}
              categoriesLoading={categoriesLoading}
              setMobileMenu={setMobileMenu}
              isTransparentState={false}
              cartCount={cartCount}
            />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 md:hidden z-[1000] transition-opacity duration-500 ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/70" onClick={() => setMobileMenu(false)} />

        <div
          className={`absolute top-0 left-0 h-full w-[80%] bg-[#4C0018] transform transition-transform duration-500 overflow-y-auto ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <Link href="/">
              <Image src={logo} alt="logo" className="w-[130px] h-auto" />
            </Link>
            <FiX className="text-2xl text-white cursor-pointer" onClick={() => setMobileMenu(false)} />
          </div>

          <nav className="flex flex-col text-white text-lg font-medium p-6">
            {staticMenuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="py-3 border-b border-white/10"
                onClick={() => setMobileMenu(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Collections — mobile accordion, categories from backend */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setMobileCollectionsOpen((v) => !v)}
                className="w-full flex items-center justify-between py-3"
              >
                <span>Collections</span>
                {mobileCollectionsOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              <div
                className={`grid transition-all duration-300 overflow-hidden ${
                  mobileCollectionsOpen ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="ml-3 mt-1 flex flex-col gap-4 rounded-xl bg-white/5 p-3">
                    {categoriesLoading && (
                      <span className="text-sm text-white/60">Loading…</span>
                    )}
                    {(categories || []).map((main) => (
                      <div key={main._id}>
                        <Link
                          href={`/collection/${main._id}`}
                          onClick={() => setMobileMenu(false)}
                          className="block text-[15px] font-semibold text-white/95"
                        >
                          {main.name}
                        </Link>
                        <div className="mt-1.5 flex flex-col gap-1">
                          {(main.subCategories || []).map((sub) => (
                            <Link
                              key={sub._id}
                              href={`/collection/${sub._id}`}
                              onClick={() => setMobileMenu(false)}
                              className="rounded-lg px-3 py-1.5 text-[14px] text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {staticEndItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="py-3 border-b border-white/10"
                onClick={() => setMobileMenu(false)}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/profile"
              className="py-3 border-b border-white/10 flex items-center justify-between"
              onClick={() => setMobileMenu(false)}
            >
              <span>{isLoggedIn ? user?.name || "Profile" : "Profile"}</span>
              <FiUser className="text-lg" />
            </Link>

            <Link
              href={iconLinks.wishlist}
              className="py-3 border-b border-white/10 flex items-center justify-between"
              onClick={() => setMobileMenu(false)}
            >
              <span>Wishlist</span>
              <FiHeart className="text-lg" />
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
