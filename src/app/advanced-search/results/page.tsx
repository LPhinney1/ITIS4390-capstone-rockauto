'use client';

import React from 'react';

export const dynamic = 'force-dynamic';

async function fetchResults(searchParams: any) {
    const query = new URLSearchParams(searchParams).toString();
    const url = `http://localhost:3000/api/search?${query}`;

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
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {results.map((item: any) => (
                            <div
                                key={item.id}
                                className="relative flex h-full flex-col rounded-lg border border-[#D1D5DC] bg-white p-4 shadow-sm"
                            >
                                <h3 className="mb-2 text-lg font-medium text-[#364153]">
                                    {item.product_name}
                                </h3>

                                <div className="mb-4 flex-1 text-sm leading-6 text-[#6B7280]">
                                    {item.price !== undefined && (
                                        <p>Price: ${item.price}</p>
                                    )}
                                    {item.year && <p>Year: {item.year}</p>}
                                    {item.make && <p>Make: {item.make}</p>}
                                    {item.model && <p>Model: {item.model}</p>}
                                    {item.category_name && (
                                        <p>Category: {item.category_name}</p>
                                    )}
                                    {item.product_description && (
                                        <p>{item.product_description}</p>
                                    )}
                                </div>

                                {/* View Part button sticks to bottom */}
                                <a
                                    href={`http://localhost:3000/api/parts/${item.id}`}
                                    className="mt-auto inline-block rounded-md bg-[#6366F1] px-4 py-2 text-sm text-white hover:bg-[#5257d8]"
                                >
                                    View Part
                                </a>
                            </div>
                        ))}
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
