"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiTruck,
  FiRefreshCcw,
  FiAward,
  FiShield,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  useGetProductQuery,
  useAddToCartMutation,
  useAddToWishlistMutation,
  fileUrl,
} from "@/lib/redux/api";
import { useRequireAuth } from "@/lib/redux/useRequireAuth";

const features = [
  { icon: FiTruck, text: "Free Shipping" },
  { icon: FiRefreshCcw, text: "7 Days Easy Return" },
  { icon: FiAward, text: "Assured Quality" },
  { icon: FiShield, text: "COD Available" },
];

const SingleProduct = ({ productId }) => {
  const router = useRouter();
  const { data: product, isLoading, isError } = useGetProductQuery(productId, {
    skip: !productId,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [qty] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");

  const requireAuth = useRequireAuth();
  const [addToCart, { isLoading: addingToCart }] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  // Derive the "active" selections from state, falling back to the product's
  // first option — avoids syncing state from the query result in an effect.
  const images = (product?.images || []).map((img) => fileUrl(img));
  const activeImage = selectedImage || images[0] || null;
  const activeSize = selectedSize || product?.sizes?.[0] || "";
  const activeColor = selectedColor || product?.colors?.[0] || "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ece7dd] px-4 py-16 text-center text-[#8a776f]">
        Product load ho raha hai…
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-[#ece7dd] px-4 py-16 text-center text-[#8a776f]">
        Ye product nahi mila.
      </div>
    );
  }

  const handleAddToCart = () => {
    requireAuth(async () => {
      try {
        await addToCart({
          product: product._id,
          quantity: qty,
          size: activeSize,
          color: activeColor,
        }).unwrap();
        setAddedMsg("Cart me add ho gaya!");
        setTimeout(() => setAddedMsg(""), 2000);
      } catch (err) {
        setAddedMsg(err?.data?.message || "Kuch galat ho gaya");
      }
    });
  };

  const handleBuyNow = () => {
    requireAuth(async () => {
      try {
        await addToCart({
          product: product._id,
          quantity: qty,
          size: activeSize,
          color: activeColor,
        }).unwrap();
        router.push("/cart");
      } catch {
        // silent — cart page will reflect the current (possibly unchanged) state
      }
    });
  };

  const handleWishlist = () => {
    requireAuth(() => addToWishlist(product._id));
  };

  return (
    <div className="min-h-screen bg-[#ece7dd] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px] border-b border-[#d8d0c4] pb-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[540px_1fr] lg:gap-10 xl:gap-14">
          {/* LEFT */}
          <div>
            <div className="overflow-hidden rounded-[4px] bg-[#6a3728]">
              <img
                src={activeImage || "https://placehold.co/900x1100?text=Srinaar"}
                alt={product.name}
                className="h-[420px] w-full object-cover sm:h-[520px] md:h-[620px]"
              />
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`h-[96px] w-[78px] flex-shrink-0 overflow-hidden rounded-[4px] border sm:h-[105px] sm:w-[86px] ${
                      activeImage === img ? "border-[#9f2635]" : "border-[#cbbfb0]"
                    }`}
                  >
                    <img src={img} alt={`thumbnail-${index}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="pt-1">
            <h1 className="font-serif text-[30px] leading-tight text-[#34241f] md:text-[38px]">
              {product.name}
            </h1>

            <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#a14f49] md:text-[15px]">
              {product.category?.name}
            </p>

            <div className="mt-4 border-t border-[#d7cec1]" />

            <div className="mt-5 flex flex-wrap items-center gap-2 text-[#2d201b]">
              {product.oldPrice && (
                <span className="text-xs uppercase tracking-[0.08em] text-[#776963] line-through md:text-sm">
                  ₹{product.oldPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="text-[30px] font-semibold leading-none md:text-[36px]">
                ₹ {product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-[#776963] md:text-[15px]">inclusive of all taxes</span>
            </div>

            <p className="mt-5 max-w-[560px] text-base leading-7 text-[#6b5a52] md:text-[17px]">
              {product.description}
            </p>

            {/* STOCK */}
            <p className="mt-2 text-sm text-[#8a776f]">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>

            {/* SIZE */}
            {product.sizes?.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-base font-medium text-[#4a3730] md:text-[17px]">Size</h3>

                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[58px] border px-4 text-base transition-all md:min-w-[62px] md:text-[17px] ${
                        activeSize === size
                          ? "h-[46px] border-[#b5162e] bg-[#b5162e] text-white"
                          : "h-[46px] border-[#c8b8aa] bg-transparent text-[#734f49] hover:border-[#b5162e]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {product.sizeGuide && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="mt-2 flex items-center gap-1 text-sm text-[#8a776f] md:text-[15px]"
                    >
                      <span>Size Guide</span>
                      {showSizeGuide ? <FiChevronUp className="text-[14px]" /> : <FiChevronDown className="text-[14px]" />}
                    </button>

                    {showSizeGuide && (
                      <div className="mt-4 overflow-hidden border border-[#d8d0c4] bg-white p-3">
                        <img src={fileUrl(product.sizeGuide)} alt="Size guide" className="w-full object-contain" />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* BUTTONS */}
            {addedMsg && (
              <p className="mt-4 text-sm font-medium text-[#7f1026]">{addedMsg}</p>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="btn-primary" onClick={handleBuyNow} disabled={addingToCart || product.stock === 0}>
                <span>Buy Now</span>
              </button>

              <button className="btn-primary3" onClick={handleAddToCart} disabled={addingToCart || product.stock === 0}>
                <span>{addingToCart ? "Adding…" : "Add To Cart"}</span>
              </button>
            </div>

            {/* COLOR */}
            {product.colors?.length > 0 && (
              <div className="mt-7">
                <div className="flex items-center gap-4">
                  <span className="text-base text-[#4a3730] md:text-[17px]">Color</span>

                  <div className="flex items-center gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`h-[18px] w-[18px] rounded-full transition hover:scale-110 md:h-[20px] md:w-[20px] ${
                          activeColor === color
                            ? "ring-2 ring-[#9f2635] ring-offset-2 ring-offset-[#ece7dd]"
                            : "border border-[#c9bcae]"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <button
                type="button"
                onClick={handleWishlist}
                className="text-sm text-[#8a776f] underline underline-offset-2"
              >
                + Add to Wishlist
              </button>
            </div>

            <div className="mt-7 border-t border-[#d7cec1]" />

            {/* PRODUCT DETAILS */}
            <div className="mt-6">
              <h2 className="font-serif text-[32px] leading-none text-[#8f2d2f] md:text-[38px]">
                Product Details
              </h2>

              {product.details ? (
                <p className="mt-5 text-base leading-7 text-[#5f514b] md:text-[17px] whitespace-pre-line">
                  {product.details}
                </p>
              ) : (
                <p className="mt-5 text-sm text-[#8a776f]">Details coming soon.</p>
              )}

              {/* FEATURES */}
              <div className="mt-8 grid grid-cols-1 gap-y-4 gap-x-6 text-base text-[#665750] sm:grid-cols-2 md:text-[20px]">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 ">
                      <Icon className="text-[#8f2d2f]" />
                      <span>{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
