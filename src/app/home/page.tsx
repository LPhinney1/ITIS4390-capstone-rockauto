import SideNav from '../ui_new/sidenav';
import { categories, promos } from './placeholder-data';
import ProductCard from '../components/product-card';

export default function Page() {
    return (
        <main className="flex-1 px-10 py-6">
            <SideNav />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {categories.map((c, i) => (
                    <ProductCard key={i} product={c} />
                ))}
            </div>

            {/* PROMOTIONS */}
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
        </main>
    );
}
