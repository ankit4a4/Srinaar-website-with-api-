"use client";

import { useMemo, useState } from "react";
import { FiHeart, FiX } from "react-icons/fi";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useAddToWishlistMutation,
  useGetWishlistQuery,
  fileUrl,
} from "@/lib/redux/api";
import { selectIsLoggedIn } from "@/lib/redux/authSlice";
import { useRequireAuth } from "@/lib/redux/useRequireAuth";

const MAX_PRICE = 20000;

export default function ShopProducts({ initialCategory = "" }) {
  // `categoryOverride` is null until the user picks a category manually;
  // until then we fall back to the route's initialCategory. This avoids
  // syncing state from a prop via useEffect.
  const [categoryOverride, setCategoryOverride] = useState(null);
  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
    maxPrice: MAX_PRICE,
    sortBy: "featured",
  });

  const activeCategory = categoryOverride ?? initialCategory;

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: productsData, isLoading, isError } = useGetProductsQuery({
    category: activeCategory || undefined,
    limit: 100,
  });

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const requireAuth = useRequireAuth();
  const [addToWishlist] = useAddToWishlistMutation();
  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !isLoggedIn });
  const wishlistIds = new Set((wishlist?.products || []).map((p) => p._id));

  const products = productsData?.products || [];

  // Flatten main + sub categories into a single filterable list
  const categoryOptions = useMemo(() => {
    const flat = [];
    (categoriesData || []).forEach((main) => {
      flat.push({ id: main._id, name: main.name });
      (main.subCategories || []).forEach((sub) =>
        flat.push({ id: sub._id, name: sub.name })
      );
    });
    return flat;
  }, [categoriesData]);

  // Colors/sizes available across the currently-loaded products
  const colorOptions = useMemo(() => {
    const set = new Map();
    products.forEach((p) => (p.colors || []).forEach((c) => set.set(c, c)));
    return Array.from(set.values());
  }, [products]);

  const sizeOptions = useMemo(() => {
    const set = new Set();
    products.forEach((p) => (p.sizes || []).forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const toggleArrayValue = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((i) => i !== value) : [...prev[key], value],
      };
    });
  };

  const clearAllFilters = () => {
    setCategoryOverride("");
    setFilters({ colors: [], sizes: [], maxPrice: MAX_PRICE, sortBy: "featured" });
  };

  const filteredProducts = useMemo(() => {
    let updated = [...products];

    if (filters.colors.length > 0) {
      updated = updated.filter((p) => (p.colors || []).some((c) => filters.colors.includes(c)));
    }
    if (filters.sizes.length > 0) {
      updated = updated.filter((p) => (p.sizes || []).some((s) => filters.sizes.includes(s)));
    }
    updated = updated.filter((p) => p.price <= filters.maxPrice);

    if (filters.sortBy === "price-low-high") updated.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === "price-high-low") updated.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === "name-a-z") updated.sort((a, b) => a.name.localeCompare(b.name));

    return updated;
  }, [products, filters]);

  const activeFilterChips = [
    ...(activeCategory
      ? [{ type: "category", label: categoryOptions.find((c) => c.id === activeCategory)?.name || "Category", value: activeCategory }]
      : []),
    ...filters.sizes.map((s) => ({ type: "sizes", label: s, value: s })),
    ...filters.colors.map((c) => ({ type: "colors", label: c, value: c, color: c })),
  ];

  const removeFilterChip = (type, value) => {
    if (type === "category") {
      setCategoryOverride("");
    } else {
      setFilters((prev) => ({ ...prev, [type]: prev[type].filter((i) => i !== value) }));
    }
  };

  const handleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(() => addToWishlist(productId));
  };

  return (
    <section className="min-h-screen bg-white text-[#222]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          {/* LEFT FILTER */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <h3 className="text-[15px] font-medium text-[#2a1d18]">Filter Options</h3>
            </div>

            {/* CATEGORY */}
            <div className="mb-8">
              <h4 className="mb-4 text-[14px] font-semibold text-[#2a1d18]">Category</h4>
              <div className="space-y-3 text-[13px] text-gray-600">
                {categoryOptions.map((item) => (
                  <label key={item.id} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === item.id}
                      onChange={() => setCategoryOverride(item.id)}
                      className="h-4 w-4 accent-[#8b5e3c]"
                    />
                    <span>{item.name}</span>
                  </label>
                ))}
                {activeCategory && (
                  <button
                    type="button"
                    onClick={() => setCategoryOverride("")}
                    className="text-[12px] text-[#8b5e3c] underline"
                  >
                    Clear category
                  </button>
                )}
              </div>
            </div>

            {/* PRICE */}
            <div className="mb-8">
              <h4 className="mb-4 text-[14px] font-semibold text-[#2a1d18]">Price</h4>
              <div className="px-1">
                <input
                  type="range"
                  min="500"
                  max={MAX_PRICE}
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#8b5e3c]"
                />
                <div className="mt-3 flex items-center justify-between text-[12px] text-gray-500">
                  <span>₹500</span>
                  <span>Up to ₹{filters.maxPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* COLOR */}
            {colorOptions.length > 0 && (
              <div className="mb-8">
                <h4 className="mb-4 text-[14px] font-semibold text-[#2a1d18]">Color</h4>
                <div className="flex flex-wrap items-center gap-3">
                  {colorOptions.map((color) => {
                    const active = filters.colors.includes(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleArrayValue("colors", color)}
                        title={color}
                        className={`flex h-7 w-7 items-center justify-center rounded-full border transition ${
                          active ? "border-[#8b5e3c] ring-2 ring-[#d9c1ab]" : "border-gray-300"
                        }`}
                      >
                        <span
                          className="h-5 w-5 rounded-full border border-black/10"
                          style={{ backgroundColor: color }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SIZE */}
            {sizeOptions.length > 0 && (
              <div>
                <h4 className="mb-4 text-[14px] font-semibold text-[#2a1d18]">Size</h4>
                <div className="space-y-3 text-[13px] text-gray-600">
                  {sizeOptions.map((size) => (
                    <label key={size} className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.sizes.includes(size)}
                        onChange={() => toggleArrayValue("sizes", size)}
                        className="h-4 w-4 accent-[#8b5e3c]"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* RIGHT CONTENT */}
          <div>
            {/* TOP BAR */}
            <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex w-full justify-between items-center gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {activeFilterChips.length > 0 ? (
                    <>
                      {activeFilterChips.map((chip, index) => (
                        <button
                          key={`${chip.type}-${chip.value}-${index}`}
                          type="button"
                          onClick={() => removeFilterChip(chip.type, chip.value)}
                          className="inline-flex items-center gap-2 border border-[#d8d2c4] bg-[#ece7db] px-3 py-2 text-[12px] text-[#2d2d2d]"
                        >
                          {chip.color && (
                            <span
                              className="h-3 w-3 rounded-full border border-black/10"
                              style={{ backgroundColor: chip.color }}
                            />
                          )}
                          <span>{chip.label}</span>
                          <FiX className="text-[12px]" />
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="text-[12px] font-medium text-[#2d2d2d] underline underline-offset-2"
                      >
                        Clear all
                      </button>
                    </>
                  ) : (
                    <span className="text-[12px] text-[#6b6b6b]">No filters selected</span>
                  )}
                </div>

                <div className="relative">
                  <span className="text-[12px] text-[#6b6b6b]">Sort by</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                    className="appearance-none ml-3 border border-[#d8d2c4] bg-[#ece7db] px-4 py-2 pr-9 text-[12px] text-[#2d2d2d] outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="name-a-z">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="py-16 text-center text-[#8a776f]">Loading products…</div>
            )}

            {isError && (
              <div className="py-16 text-center text-red-600">
                Products load nahi ho paye. Backend chal raha hai check karo.
              </div>
            )}

            {/* PRODUCTS */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
              {filteredProducts.map((product) => (
                <Link key={product._id} href={`/singleproduct/${product._id}`} className="group block">
                  <div className="overflow-hidden">
                    <div className="relative h-[350px] md:h-[340px] overflow-hidden bg-[#f6f1ed] sm:h-[350px] lg:h-[400px]">
                      <img
                        src={fileUrl(product.images?.[0]) || "https://placehold.co/600x800?text=Srinaar"}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                      <button
                        type="button"
                        onClick={(e) => handleWishlist(e, product._id)}
                        className={`absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:bg-[#7f1026] hover:text-white sm:h-11 sm:w-11 ${
                          wishlistIds.has(product._id) ? "text-[#7f1026]" : "text-[#7f1026]"
                        }`}
                      >
                        <FiHeart className="text-[18px]" fill={wishlistIds.has(product._id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="px-1 pt-4">
                      <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9a9a9a]">
                        {product.category?.name}
                      </p>
                      <h3 className="line-clamp-2 min-h-[48px] font-serif text-[16px] leading-[1.4] text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#7f1026] sm:text-[18px]">
                        {product.name}
                      </h3>
                      <div className="mt-3 flex items-end gap-2">
                        <span className="text-[22px] font-semibold leading-none text-[#1f1f1f] sm:text-[26px]">
                          ₹{product.price?.toLocaleString("en-IN")}
                        </span>
                        {product.oldPrice && (
                          <span className="pb-[2px] text-[13px] text-[#9a9a9a] line-through">
                            ₹{product.oldPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {!isLoading && filteredProducts.length === 0 && (
              <div className="py-16 text-center">
                <h3 className="text-lg font-medium text-[#2a1d18]">No products found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try changing your filters or clear all filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-4 border border-[#d8d2c4] bg-[#ece7db] px-4 py-2 text-[12px] text-[#2d2d2d]"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
