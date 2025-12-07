'use client';
import { productsList, promos } from '@/app/placeholder-data';
import ProductCardUser from '@/app/components/product-card';
import { Car } from 'lucide-react';
import { useAuth } from '../auth-provider';
import Link from 'next/link';

export default function ProfilePage() {
    const auth = useAuth();
    if (auth.signedIn === false || auth.user === undefined){
        return <div>Error, please sign in</div>
    }
    const user = auth.user;
    const vehicles = user.MyCars;
    return (
        <div className="flex-1 p-8 bg-white">
            <div className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-12">
                    <div>
                        <h1 className="text-[40px] text-gray-900 mb-2">
                            {/* Welcome {userName}! */}
                        </h1>
                        <h2 className="text-[32px] text-gray-700">
                            Hello {user.name}!
                            Your Vehicle Recommendations
                        </h2>
                    </div>

                    {/* Your Garage Button */}
                    <button
                        // onClick={onGoToGarage}
                        className="flex items-center gap-3 bg-[#9e9e9e] hover:bg-[#7e7e7e] text-white px-8 py-6 rounded-full transition-colors shadow-[0px_2px_0px_0px_#000000]"
                    >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <Car className="w-7 h-7 text-gray-900" />
                        </div>
                        <span className="text-[17px] tracking-[1.25px] uppercase">
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
                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-gray-50 rounded-lg border border-gray-200">
                        <Car className="w-16 h-16 text-gray-300 mb-4" />
                        <h3 className="text-[24px] text-gray-900 mb-2">
                            No Recommendations Yet
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md">
                            {vehicles.length === 0
                                ? 'Add a vehicle to your garage to get personalized part recommendations.'
                                : 'We\'re working on personalized recommendations for your vehicles.'}
                        </p>
                        <Link
                            href='/dashboard/garage'
                            className="bg-primary hover:bg-[#4f46e5] text-white px-8 py-4 rounded-[6px] transition-colors"
                        >
                            {vehicles.length === 0 ? 'Add Your First Vehicle' : 'Go to Garage'}
                        </Link>
                    </div>
                )}

                {/* Info Banner */}
                <div className="mt-12 p-6 bg-[#eef2ff] rounded-lg border border-[#c7d2fe]">
                    <h3 className="text-[20px] text-[#4338ca] mb-2">
                        Personalized for Your Vehicles
                    </h3>
                </div>
            </div>
        </div>
    );
}