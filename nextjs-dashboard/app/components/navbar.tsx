import NavLinks from '../ui_new/nav-links';
import Link from 'next/link';
import SearchBar from '../ui_new/search-bar';


export default function NavBar() {
    return (
        <nav className="bg-[#3d3e4f] sticky w-full z-20 top-0 start-0 border-b border-default">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-2 p-3">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.png" className="h-6" alt="RockAuto" />
                </Link>
                <div className="items-centerjustify-between bg-red-300 hidden w-full md:flex md:w-auto md:order-2" id="navbar-sticky">
                    <SearchBar />
                </div>

                {/* go to nav-links.tsx */}
                <div className="flex md:order-3 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className="flex items-center gap-2 flex-none">
                        <NavLinks />
                    </div>
                </div>

            </div>
            <div className="bg-[#5b5fc7] text-white text-center py-2">
                <p className="text-xs leading-tight">ALL THE PARTS YOUR CAR WILL EVER NEED</p>
            </div>
        </nav>
    );
}
