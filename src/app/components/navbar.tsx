import NavLinks from '../ui_new/nav-links';
import Link from 'next/link';
import SearchBar from '../ui_new/search-bar';

export default function NavBar() {
    return (
        <nav className="border-default sticky start-0 top-0 z-20 w-full border-b bg-[#3d3e4f]">
            <div className="mx-2 flex max-w-screen-2xl flex-wrap items-center justify-between p-3">
                <Link
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img src="/logo.png" className="h-6" alt="RockAuto" />
                </Link>
                <div
                    className="hidden w-full items-center justify-between bg-red-300 md:order-2 md:flex md:w-auto"
                    id="navbar-sticky"
                >
                    <SearchBar />
                </div>

                {/* go to nav-links.tsx */}
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
