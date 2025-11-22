'use client';

import { Search, SlidersHorizontal } from 'lucide-react';

function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    console.log('Search submitted');
    //HERE: Implement search logic
}

function onAdvancedSearchClick() {
    console.log('Advanced search clicked');
    //HERE: Add a modal
}

export default function SearchBar() {
    return (
        <div className="flex flex-grow justify-center">
            <form onSubmit={handleSearch} className="flex w-full gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for parts by name, model, or part number..."
                        className="w-full rounded border border-gray-300 bg-white px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5b5fc7]"
                    />
                    <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded p-1.5 transition-colors hover:bg-gray-100"
                        aria-label="Search"
                    >
                        <Search className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
            </form>
            <button
                type="button"
                onClick={onAdvancedSearchClick}
                className="flex items-center gap-1.5 whitespace-nowrap rounded border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-100"
                title="Advanced Search"
            >
                <SlidersHorizontal className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Advanced</span>
            </button>
        </div>
    );
}
