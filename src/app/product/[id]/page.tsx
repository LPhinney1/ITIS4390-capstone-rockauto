import React from "react";
import Link from "next/link";
import BackButton from "@/app/components/back-button";
import { ShoppingCart } from "lucide-react";

interface Part {
    id: number;
    vehicle_id: number;
    category_id: number;
    product_name: string;
    product_description: string | null;
    price: number | string | null;
    product_image_url: string | null;
}

interface PageProps {
    params: { id: string };
}

async function fetchPart(id: string): Promise<Part> {
    const res = await fetch(`http://localhost:3000/api/parts/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch part data");
    }
    return res.json();
}

async function fetchAllParts(): Promise<Part[]> {
    const res = await fetch(`http://localhost:3000/api/parts`, {
        cache: "no-store",
    });
    if (!res.ok) {
        return [];
    }
    return res.json();
}

export default async function ProductPage({ params }: PageProps) {
    const part = await fetchPart(params.id);
    const allParts = await fetchAllParts();

    const similarParts = allParts
        .filter((p) => p.id !== part.id && p.category_id === part.category_id)
        .slice(0, 6);

    const description =
        part.product_description ||
        "High-quality replacement part engineered for consistent performance and reliability.";

    return (
        <div className="min-h-screen bg-[#f5f5fa] px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <BackButton />

                {/* Top section: image card + info */}
                <div className="grid gap-10 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                    {/* Product Card */}
                    <div className="rounded-3xl bg-white p-4 shadow-md">
                        <div className="overflow-hidden rounded-2xl bg-gray-100">
                            <img
                                src={part.product_image_url || "/placeholder.png"}
                                alt={part.product_name}
                                className="h-72 w-full object-cover"
                            />
                        </div>

                        <div className="mt-4 space-y-1">
                            <h1 className="text-lg font-semibold text-gray-900">
                                {part.product_name}
                            </h1>
                            <p className="text-base font-semibold text-indigo-600">
                                {part.price !== null ? `$${part.price}` : "Pricing unavailable"}
                            </p>
                        </div>
                    </div>

                    {/* Product Description + Buttons */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Description
                            </h2>

                            <p className="mt-4 text-sm leading-relaxed text-gray-700">
                                {description}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button className="h-12 rounded-full bg-gray-900 px-10 text-sm font-semibold tracking-wide text-white shadow hover:bg-black">
                                COMPARE
                            </button>

                            <button className="flex h-12 items-center gap-2 rounded-full bg-indigo-500 px-10 text-sm font-semibold tracking-wide text-white shadow hover:bg-indigo-600">
                                <ShoppingCart className="h-5 w-5" strokeWidth={2} />
                                <span>ADD TO CART</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                {similarParts.length > 0 && (
                    <section className="mt-10">
                        <h3 className="mb-4 text-sm font-semibold text-gray-800">
                            Similar Products
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {similarParts.map((similar) => (
                                <div
                                    key={similar.id}
                                    className="min-w-[180px] rounded-3xl bg-white p-4 shadow-sm"
                                >
                                    <Link href={`/product/${similar.id}`}>
                                        <div className="h-24 w-full overflow-hidden rounded-2xl bg-gray-100">
                                            <img
                                                src={similar.product_image_url || "/placeholder.png"}
                                                alt={similar.product_name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="mt-3 space-y-1">
                                            <p className="text-xs font-medium text-gray-900 line-clamp-2">
                                                {similar.product_name}
                                            </p>
                                            <p className="text-xs font-semibold text-indigo-600">
                                                {similar.price !== null
                                                    ? `$${similar.price}`
                                                    : "Pricing unavailable"}
                                            </p>
                                        </div>
                                    </Link>

                                    <button className="mt-4 w-full rounded-full bg-gray-900 px-3 py-2 text-[11px] font-semibold text-white">
                                        COMPARE
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Deals strip */}
                <section className="mt-10 grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">
                            Free Shipping on Orders Over $50
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            Get your parts delivered fast with no extra cost on qualifying
                            orders.
                        </p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">
                            Winter Sale - Up to 40% Off!
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            Premium brake pads, rotors, and suspension components.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
