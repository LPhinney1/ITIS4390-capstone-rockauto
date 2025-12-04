'use client';

import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { promos } from './placeholder-data';
import { ProductCardHome } from './components/product-card';
import CategorySidebar from './ui_new/sidenav';
import Link from 'next/link';

type Category = { id: number; name: string };
type Part = {
    id: number;
    product_name: string;
    price: number;
    category_id: number;
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <ContentWrapper />
        </Suspense>
    );
}

function ContentWrapper() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    return <Content searchQuery={searchQuery} />;
}

function Content({ searchQuery }: { searchQuery: string }) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null,
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCategories() {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        }
        loadCategories();
    }, []);

    useEffect(() => {
        loadParts(searchQuery);
    }, [selectedCategory, searchQuery]);

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

    //When clicking a product card, remember where the user was on the page (for use when user clicks back button on individual product page)
    const handleProductClick = () => {
        if (typeof window === 'undefined') return;

        //Include query string so scroll is per-search
        sessionStorage.setItem(
            'homePath',
            window.location.pathname + window.location.search,
        );
        sessionStorage.setItem('homeScrollY', String(window.scrollY));
    };

    //Restore scroll if it is saved after user clicks back button on individual product page
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (loading) return;

        const savedPath = sessionStorage.getItem('homePath');
        const savedY = sessionStorage.getItem('homeScrollY');

        if (
            savedPath &&
            savedPath === window.location.pathname + window.location.search &&
            savedY
        ) {
            const y = parseFloat(savedY);
            window.scrollTo(0, y);

            //Clear so future visits start fresh
            sessionStorage.removeItem('homePath');
            sessionStorage.removeItem('homeScrollY');
        }
    }, [loading]);

    return (
        <>
            <main className="flex flex-1">
                <CategorySidebar
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                    categories={categories}
                />

                <div className="m-5 w-full">
                    {loading && <p className="text-gray-500">Loading parts…</p>}

                    {!loading && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {parts.map((part) => (
                                <Link
                                key={part.id}
                                href={`/product/${part.id}`}
                                className="block"
                                onClick={handleProductClick}
                            >
                                <ProductCardHome
                                    product={{
                                        name: part.product_name,
                                        price: part.price,
                                        image: '/placeholder.png',
                                    }}
                                />
                            </Link>
                            ))}
                        </div>
                    )}
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
