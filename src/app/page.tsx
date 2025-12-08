'use client';

import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { productsList, promos } from './placeholder-data';
import { ProductCardHome } from './components/product-card';
import CategorySidebar from './ui_new/sidenav';
import Link from 'next/link';

type Category = { id: number; name: string };
type Part = {
    id: number;
    product_name: string;
    price: number;
    category_id: number;
    category?: string;
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

    const getCategoryImage = (
        categoryId?: number,
        categoryName?: string,
    ): string => {
        // If we have a category name string, use that
        if (categoryName) {
            const nameMap: { [key: string]: number } = {
                'Brake Pads': 1,
                'Oil Filter': 2,
                'Air Filter': 3,
                Battery: 4,
                Radiator: 5,
            };
            const imageNumber = nameMap[categoryName] || 1;
            return `/products/${imageNumber}.png`;
        }

        // Otherwise fall back to category_id mapping
        if (categoryId) {
            const imageMap: { [key: number]: number } = {
                1: 1, // Brake Pads -> 1.png
                2: 2, // Oil Filter -> 2.png
                3: 3, // Air Filter -> 3.png
                4: 4, // Battery -> 4.png
                5: 5, // Radiator -> 5.png
            };
            const imageNumber = imageMap[categoryId] || 1;
            return `/products/${imageNumber}.png`;
        }

        // Default fallback
        return '/products/1.png';
    };

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
                category: item.category,
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
    const featuredItems = [
        {
            id: 1,
            title: 'Premium Brake Kits',
            description: 'Up to 30% off',
            image: 'https://images.unsplash.com/photo-1750019487267-47568f388dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmFrZSUyMHBhZHN8ZW58MXx8fHwxNzYwNzgzMjYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: '#e8f4f8',
        },
        {
            id: 2,
            title: 'Engine Components',
            description: 'Performance Upgrades',
            image: 'https://images.unsplash.com/photo-1758381358962-efc41be53986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NjA5MDcxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: '#f8e8e8',
        },
        {
            id: 3,
            title: 'Suspension Systems',
            description: 'Smooth Ride Guaranteed',
            image: 'https://images.unsplash.com/photo-1669136048337-5daa3adef7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzdXNwZW5zaW9ufGVufDF8fHx8MTc2MDkwNzE0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: '#e8f8e8',
        },
        {
            id: 4,
            title: 'Premium Batteries',
            description: 'Long-lasting Power',
            image: 'https://images.unsplash.com/photo-1597766325363-f5576d851d6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBiYXR0ZXJ5fGVufDF8fHx8MTc2MDgyODg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: '#f8f8e8',
        },
        {
            id: 5,
            title: 'Oil Filters & More',
            description: 'Quality Maintenance',
            image: 'https://images.unsplash.com/photo-1657644049321-4c3aa2e8aba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBvaWwlMjBmaWx0ZXJ8ZW58MXx8fHwxNzYwOTA3MTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            bgColor: '#f0e8f8',
        },
    ];

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
                    <div className="my-6 h-[3px] w-2/5 rounded-full bg-[primary]" />

                    <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {featuredItems.map((item) => (
                            <div
                                key={item.id}
                                className="h-[120px] cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow-md transition-all hover:shadow-xl"
                            >
                                <div className="relative h-full w-full">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#6366f1]/80 to-transparent p-4">
                                        <h3 className="mb-1 text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-white/90">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="my-6 mb-5 h-[3px] w-2/5 rounded-full bg-[primary]" />
                    <div className="my-6 h-[4px] w-24 rounded-full bg-[primary]" />

                    {!loading && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                                            image: getCategoryImage(
                                                part.category_id,
                                                part.category,
                                            ),
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="my-6 h-[5px] w-24 rounded-full bg-[primary]" />

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
