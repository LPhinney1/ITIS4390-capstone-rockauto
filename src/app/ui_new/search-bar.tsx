'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!query) return;

        // Navigate to home with query param
        router.push(`/?search=${encodeURIComponent(query)}`);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for parts by name or model.."
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5b5fc7]"
            />
            <button
                type="button"
                onClick={() => router.push('/advanced-search')}
                className="flex items-center gap-1.5 whitespace-nowrap rounded border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-100"
                title="Advanced Search"
            >
                <SlidersHorizontal className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Advanced</span>
            </button>
        </form>
    );
}
