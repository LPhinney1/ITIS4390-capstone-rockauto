'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdvancedSearchPage() {
    const router = useRouter();

    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [category, setCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    function clearFilters() {
        setYear('');
        setMake('');
        setModel('');
        setCategory('');
        setMaxPrice('');
    }

    function handleSearch() {
        const params = new URLSearchParams();

        if (year) params.set('year', year);
        if (make) params.set('make', make);
        if (model) params.set('model', model);
        if (category) params.set('category', category);
        if (maxPrice) params.set('maxPrice', maxPrice);

        router.push(`/results?${params.toString()}`);
    }

    return (
        <div className="flex min-h-screen bg-[#FFFFFF] px-4 py-10">
            <div className="flex flex-1 justify-center">
                <div className="self-start w-full max-w-md overflow-hidden rounded-xl border border-[#D1D5DC] bg-[#FFFFFF] shadow-md">
                    <div className="bg-[primary] pt-6 text-center text-white">
                        <h1 className="text-2xl font-semibold text-black">
                            Advanced Search
                        </h1>
                    </div>

                    <div className="flex flex-col gap-4 p-8">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#364153]">
                                Year
                            </label>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="rounded-md border border-[#D1D5DC] bg-white px-3 py-2 text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#364153]">
                                Make
                            </label>
                            <input
                                type="text"
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                className="rounded-md border border-[#D1D5DC] bg-white px-3 py-2 text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#364153]">
                                Model
                            </label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="rounded-md border border-[#D1D5DC] bg-white px-3 py-2 text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#364153]">
                                Category
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="rounded-md border border-[#D1D5DC] bg-white px-3 py-2 text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-[#364153]">
                                Max Price
                            </label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="rounded-md border border-[#D1D5DC] bg-white px-3 py-2 text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                            />
                        </div>
                        <p className="text-center italic text-gray-500">
                            All filters are optional
                        </p>
                        <div className="mt-4 flex justify-center gap-6">
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="w-32 rounded-md bg-[#D1D5DC] py-2 text-white"
                            >
                                Clear Filters
                            </button>

                            <button
                                type="button"
                                onClick={handleSearch}
                                className="w-32 rounded-md bg-[primary] py-2 text-white bg-[#5257d8] transition-colors hover:bg-[#4f46e5]"
                            >
                                Search
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <Link
                                href="/"
                                className="text-sm text-[#364153] hover:underline"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
