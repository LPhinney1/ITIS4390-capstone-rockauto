"use client";

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
        <div className="flex-grow flex justify-center">
            <form
                onSubmit={handleSearch}
                className="w-full flex gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for parts by name, model, or part number..."
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#5b5fc7]"
                    />
                    <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Search"
                    >
                        <Search className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </form>
            <button
                type="button"
                onClick={onAdvancedSearchClick}
                className="flex items-center gap-1.5 bg-white hover:bg-gray-100 border border-gray-300 px-3 py-2 rounded transition-colors whitespace-nowrap"
                title="Advanced Search"
            >
                <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Advanced</span>
            </button>
        </div>
    );
}