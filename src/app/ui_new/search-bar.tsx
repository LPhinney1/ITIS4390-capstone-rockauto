'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
                type="submit"
                className="rounded bg-[#5b5fc7] px-3 py-2 text-white hover:bg-[#4e50b0]"
            >
                Search
            </button>
        </form>
    );
}
