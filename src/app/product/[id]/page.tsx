import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import AddToCompareButton from './AddToCompareButton';

interface Part {
    id: number;
    vehicle_id: number;
    category_id: number;
    product_name: string;
    product_description: string | null;
    price: number | string | null;
    product_image_url: string | null;
    year: number;
    make: string;
    model: string;
}

interface PageProps {
    params: { id: string };
}

async function fetchPart(id: string): Promise<Part> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/parts/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch part data');
    }
    return res.json();
}

async function fetchAllParts(): Promise<Part[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/parts`, {
        cache: 'no-store',
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

    return (
        <div className="min-h-screen bg-[#f5f5fa] px-6 py-10">
            <div className="mx-auto max-w-6xl">
                {/* Top section: image card + info */}
                <div className="grid gap-10 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                    {/* Product Card */}
                    <div className="rounded-3xl bg-white p-4 shadow-md">
                        <div className="overflow-hidden rounded-2xl bg-gray-100">
                            <img
                                src={
                                    part.product_image_url || '/placeholder.png'
                                }
                                alt={part.product_name}
                                className="h-72 w-full object-cover"
                            />
                        </div>

                        <div className="mt-4 space-y-1">
                            <h1 className="mb-3 text-lg font-semibold text-gray-900">
                                {part.product_name}
                            </h1>
                            <p className="text-base font-semibold text-indigo-600">
                                {part.price !== null
                                    ? `$${part.price}`
                                    : 'Pricing unavailable'}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Description
                            </h2>

                            <div
                                key={part.id}
                                className="relative flex h-full flex-col rounded-lg border border-[#D1D5DC] bg-white p-4 shadow-sm"
                            >
                                <h3 className="mb-2 text-lg font-medium text-[#364153]">
                                    {part.product_name}
                                </h3>
                                <div className="mb-4 flex-1 text-sm leading-6 text-[#6B7280]">
                                    {part.price !== undefined && (
                                        <p>Price: ${part.price}</p>
                                    )}

                                    {part.product_description && (
                                        <p className="mt-2">
                                            {part.product_description}
                                        </p>
                                    )}

                                    <div className="mt-4 space-y-1 border-t pt-3">
                                        {part.year && <p>Year: {part.year}</p>}
                                        {part.make && <p>Make: {part.make}</p>}
                                        {part.model && (
                                            <p>Model: {part.model}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <AddToCompareButton productId={part.id} />
                            <Link
                                href={`/dashboard/cart?productId=${part.id}`}
                                className="flex h-12 items-center gap-2 rounded-full bg-indigo-500 px-10 text-sm font-semibold tracking-wide text-white shadow hover:bg-indigo-600"
                            >
                                <ShoppingCart
                                    className="h-5 w-5"
                                    strokeWidth={2}
                                />
                                <span>ADD TO CART</span>
                            </Link>
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
                                                src={
                                                    similar.product_image_url ||
                                                    '/placeholder.png'
                                                }
                                                alt={similar.product_name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="mt-3 space-y-1">
                                            <p className="line-clamp-2 text-xs font-medium text-gray-900">
                                                {similar.product_name}
                                            </p>
                                            <p className="text-xs font-semibold text-indigo-600">
                                                {similar.price !== null
                                                    ? `$${similar.price}`
                                                    : 'Pricing unavailable'}
                                            </p>
                                        </div>
                                    </Link>

                                    <AddToCompareButton
                                        productId={similar.id}
                                        className="mt-4 w-full"
                                    />
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
                            Get your parts delivered fast with no extra cost on
                            qualifying orders.
                        </p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">
                            Winter Sale - Up to 40% Off!
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            Premium brake pads, rotors, and suspension
                            components.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
