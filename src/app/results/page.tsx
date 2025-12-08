import React from 'react';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import {
    ProductCardCart,
    Product,
    ProductCardResults,
} from '../components/product-card';

async function fetchResults(searchParams: any) {
    const query = new URLSearchParams(searchParams).toString();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/api/search?${query}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];

    return res.json();
}
export default async function SearchResultsPage({
    searchParams,
}: {
    searchParams: any;
}) {
    const results = await fetchResults(searchParams);
    const noFilters =
        !searchParams.year &&
        !searchParams.make &&
        !searchParams.model &&
        !searchParams.category &&
        !searchParams.maxPrice;

    return (
        <div className="min-h-screen bg-[#FFFFFF] px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-6 text-3xl font-semibold text-[#364153]">
                    Search Results
                </h1>

                {/* Show selected filters */}
                <div className="mb-6 rounded-lg border border-[#D1D5DC] bg-[#F3F4F6] p-4">
                    <h2 className="mb-2 font-medium text-[#364153]">Filters</h2>

                    {noFilters ? (
                        <p className="text-sm text-[#6B7280]">
                            No filters selected.
                        </p>
                    ) : (
                        <ul className="text-sm leading-6 text-[#364153]">
                            {searchParams.year && (
                                <li>Year: {searchParams.year}</li>
                            )}
                            {searchParams.make && (
                                <li>Make: {searchParams.make}</li>
                            )}
                            {searchParams.model && (
                                <li>Model: {searchParams.model}</li>
                            )}
                            {searchParams.category && (
                                <li>Category: {searchParams.category}</li>
                            )}
                            {searchParams.maxPrice && (
                                <li>Max Price: ${searchParams.maxPrice}</li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Results */}
                {results.length === 0 ? (
                    <div className="mt-20 text-center">
                        <p className="text-lg text-[#6B7280]">
                            No results found.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {results.map(
                            (item: {
                                id: number;
                                product_name: any;
                                price: string;
                                product_image_url: string;
                            }) => (
                                <Link
                                    key={item.id}
                                    href={`/product/${item.id}`}
                                    className="block"
                                >
                                    <ProductCardResults
                                        product={{
                                            id: item.id,
                                            name: item.product_name,
                                            price: item.price,
                                            image: item.product_image_url,
                                        }}
                                    />
                                </Link>
                            ),
                        )}

                        {/* //HERE */}
                    </div>
                )}

                {/* Back Link */}
                <div className="mt-10 text-center">
                    <a
                        href="/advanced-search"
                        className="text-sm text-[#364153] hover:underline"
                    >
                        ← Back to Advanced Search
                    </a>
                </div>
            </div>
        </div>
    );
}
