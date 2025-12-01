'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // For reading ?search=...
import { promos } from './placeholder-data';
import { ProductCardHome } from './components/product-card';
import CategorySidebar from './ui_new/sidenav';

type Category = { id: number; name: string };
type Part = {
    id: number;
    product_name: string;
    price: number;
    category_id: number;
};

export default function Page() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null,
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(false);

    // Load categories
    useEffect(() => {
        async function loadCategories() {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        }
        loadCategories();
    }, []);

    // Load parts when category or search query changes
    useEffect(() => {
        loadParts(searchQuery);
    }, [selectedCategory, searchQuery]);

    // Fetch parts from API (by category or search query)
    async function loadParts(query?: string) {
        setLoading(true);

        let url = '/api/parts';
        if (query) {
            url = `/api/parts/search?q=${encodeURIComponent(query)}`;
        } else if (selectedCategory !== null) {
            url = `/api/parts/categories/${selectedCategory}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setParts(
            data.map((item: any) => ({
                id: item.id,
                product_name: item.product_name,
                price: item.price,
                category_id: item.category_id,
            })),
        );

        setLoading(false);
    }

    return (
        <>
            <main className="mx-5 flex flex-1">
                {/* Left Sidebar */}
                <CategorySidebar
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                    categories={categories}
                />

                {/* Main Content */}
                <div className="m-5 w-full">
                    {loading && <p className="text-gray-500">Loading parts…</p>}

                    {!loading && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {parts.map((part) => (
                                <ProductCardHome
                                    key={part.id}
                                    product={{
                                        name: part.product_name,
                                        price: part.price,
                                        image: '/placeholder.png',
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Promotions */}
                    <div className="mt-10 flex flex-col gap-4">
                        {promos.map((p, i) => (
                            <div
                                key={i}
                                className="flex justify-between rounded-xl border bg-white p-5 shadow"
                            >
                                <div>
                                    <p className="font-semibold">{p.title}</p>
                                    <p className="text-sm text-gray-500">
                                        Special offer available now
                                    </p>
                                </div>
                                <div className="h-fit rounded-md bg-blue-500 px-4 py-2 text-sm text-white">
                                    {p.tag}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
