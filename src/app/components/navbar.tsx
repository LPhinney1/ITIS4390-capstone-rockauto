'use client';

import Link from 'next/link';
import NavLinks from '../ui_new/nav-links';
import SearchBar from '../ui_new/search-bar';

interface NavBarProps {
    onSearch?: (query: string) => void; // optional
}

export default function NavBar({ onSearch }: NavBarProps) {
    return (
        <nav className="w-full bg-[#3d3e4f]">
            <div className="mx-2 flex items-center justify-between p-3">
                <Link href="/" className="shrink-0 rtl:space-x-reverse">
                    <img src="/logo.png" className="h-6" alt="RockAuto" />
                </Link>

                {/* Always render SearchBar and Advanced Search button */}
                <div
                    className="mx-10 flex w-3/5 gap-2 md:order-2 md:flex"
                    id="navbar-sticky"
                >
                    <SearchBar onSearch={onSearch || (() => {})} />

                    <Link
                        href="/advanced-search"
                        className="flex items-center gap-1.5 whitespace-nowrap rounded border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-100"
                        title="Advanced Search"
                    >
                        <span className="text-sm text-gray-700">Advanced</span>
                    </Link>
                </div>

                <div className="flex space-x-3 md:order-3 md:space-x-0 rtl:space-x-reverse">
                    <div className="flex flex-none items-center gap-2">
                        <NavLinks />
                    </div>
                </div>
            </div>

            <div className="bg-[#5b5fc7] py-2 text-center text-white">
                <p className="text-xs leading-tight">
                    ALL THE PARTS YOUR CAR WILL EVER NEED
                </p>
            </div>
        </nav>
    );
}
