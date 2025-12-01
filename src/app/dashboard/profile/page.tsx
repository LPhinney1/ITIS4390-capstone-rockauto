import { categories, promos } from '../../placeholder-data';
import ProductCardUser from '@/app/components/product-card';
import { MyCars } from '@/app/dashboard/garage/page';

export default function Page() {
    return (
        <main className="flex-1 px-10 py-6">
            <h1>Profile Page</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {categories.map((c, i) => (
                    <ProductCardUser key={i} product={c} />
                ))}
            </div>

            <div className="mt-12 rounded-lg border border-[#c7d2fe] bg-[#eef2ff] p-6">
                <h3 className="mb-2 text-[20px] text-[#4338ca]">
                    Personalized for Your Vehicles
                </h3>
                <p className="text-[#4338ca]">
                    {MyCars.length > 0
                        ? `These parts are recommended based on your ${MyCars.length} vehicle${MyCars.length !== 1 ? 's' : ''} in the garage. Browse by category for more options.`
                        : 'Add vehicles to your garage to see personalized recommendations tailored to your specific makes and models.'}
                </p>
            </div>
        </main>
    );
}
