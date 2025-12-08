'use client';
import { productsList, promos } from '@/app/placeholder-data';
import ProductCardUser from '@/app/components/product-card';
import { Car } from 'lucide-react';
import { useAuth } from '../auth-provider';
import Link from 'next/link';

export default function ProfilePage() {
    const auth = useAuth();
    if (auth.signedIn === false || auth.user === undefined) {
        return <div>Error, please sign in</div>;
    }
    const user = auth.user;
    const vehicles = user.MyCars;
    return (
        <div className="flex-1 bg-white p-8">
            <div className="mx-auto max-w-[1600px]">
                {/* Header Section */}
                <div className="mb-12 flex items-start justify-between">
                    <div>
                        <h1 className="mb-2 text-[40px] text-gray-900">
                            {/* Welcome {userName}! */}
                        </h1>
                        <h2 className="text-[32px] text-gray-700">
                            Hello {user.name}! Your Vehicle Recommendations
                        </h2>
                    </div>

                    {/* Your Garage Button */}
                    <button
                        // onClick={onGoToGarage}
                        className="flex items-center gap-3 rounded-full bg-[#9e9e9e] px-8 py-6 text-white shadow-[0px_2px_0px_0px_#000000] transition-colors hover:bg-[#7e7e7e]"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                            <Car className="h-7 w-7 text-gray-900" />
                        </div>
                        <span className="text-[17px] uppercase tracking-[1.25px]">
                            Your Garage
                        </span>
                    </button>
                </div>

                {/* Recommendations Grid */}
                {productsList.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {productsList.map((c, i) => (
                            <ProductCardUser key={5} product={c} />
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-6 py-16 text-center">
                        <Car className="mb-4 h-16 w-16 text-gray-300" />
                        <h3 className="mb-2 text-[24px] text-gray-900">
                            No Recommendations Yet
                        </h3>
                        <p className="mb-6 max-w-md text-gray-600">
                            {vehicles.length === 0
                                ? 'Add a vehicle to your garage to get personalized part recommendations.'
                                : "We're working on personalized recommendations for your vehicles."}
                        </p>
                        <Link
                            href="/dashboard/garage"
                            className="rounded-[6px] bg-[#5b5fc7] px-8 py-4 text-white transition-colors hover:bg-[#4f46e5]"
                        >
                            {vehicles.length === 0
                                ? 'Add Your First Vehicle'
                                : 'Go to Garage'}
                        </Link>
                    </div>
                )}

                {/* Info Banner */}
                <div className="mt-12 rounded-lg border border-[#c7d2fe] bg-[#eef2ff] p-6">
                    <h3 className="mb-2 text-[20px] text-[#4338ca]">
                        Personalized for Your Vehicles
                    </h3>
                </div>
            </div>
        </div>
    );
}
