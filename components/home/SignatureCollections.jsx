"use client";
import Link from "next/link";
import img from "../../assets/home/collection.png";
import "@/app/globals.css";
import { useGetCategoriesQuery, useGetProductsQuery, fileUrl } from "@/lib/redux/api";

export default function SignatureCollections() {
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
    const { data: productsData } = useGetProductsQuery({ limit: 40 });
    const products = productsData?.products || [];

    // Show up to 4 main categories; use the first product image found for
    // that category as the card image, falling back to a static shot.
    const collections = (categories || []).slice(0, 4).map((cat) => {
        const match = products.find((p) => p.category?._id === cat._id);
        return {
            id: cat._id,
            title: cat.name,
            image: match?.images?.[0] ? fileUrl(match.images[0]) : img.src,
        };
    });

    if (!categoriesLoading && collections.length === 0) return null;

    return (
        <section className="bg-[#e7e0d6] py-16">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="flex items-center justify-center gap-6 mb-12">

                    {/* Left Side */}
                    <div className="flex items-center md:flex hidden relative w-full max-w-[260px]">
                        <span className="w-2 h-2 bg-[#4C0018] rounded-full absolute "></span>
                        <div className="flex-1 h-[1px] bg-[#4C0018] "></div>
                        <span className="w-2 h-2 bg-[#4C0018] rounded-full right-3 absolute"></span>
                        <span className="w-3 h-3 bg-[#4C0018] rounded-full"></span>

                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl font-serif text-gray-600 whitespace-nowrap">
                        Our Signature Collections
                    </h2>

                    {/* Right Side */}
                    <div className="flex items-center md:flex hidden w-full relative max-w-[260px]">
                        <span className="w-3 h-3 bg-[#4C0018] rounded-full"></span>
                        <span className="w-2 h-2 bg-[#4C0018] rounded-full left-3 absolute mr-1"></span>
                        <div className="flex-1 h-[1px] bg-[#4C0018] "></div>
                        <span className="w-2 h-2 bg-[#4C0018] rounded-full"></span>
                    </div>

                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-4 gap-6">

                    {categoriesLoading &&
                      Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-[420px] rounded-2xl bg-black/5 animate-pulse" />
                      ))}

                    {collections.map((item) => (
                        <Link
                            href={`/collection/${item.id}`}
                            key={item.id}
                            className="relative rounded-2xl overflow-hidden group shadow-lg block"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover w-full h-[420px] group-hover:scale-105 transition duration-500"
                            />

                            {/* overlay */}
                            <div className="absolute inset-0 bg-black/30"></div>

                            {/* content */}
                            <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                                <h3 className="text-2xl font-serif mb-3">
                                    {item.title}
                                </h3>

                                <button className="btn-primary2">
                                    <span>Explore</span>
                                </button>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
}
