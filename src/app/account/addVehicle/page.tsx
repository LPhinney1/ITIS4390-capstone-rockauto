// src/app/dashboard/add-vehicle/page.tsx
import Link from 'next/link';

export default function AddVehiclePage() {
    return (
        <main className="flex-1 bg-[#f5f5fb]">
            <div className="mx-auto max-w-7xl px-4">
                {/* Centered card (same height as login/create-account) */}
                <div className="flex min-h-[calc(100vh-220px)] items-center justify-center">
                    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                        {/* Purple header */}
                        <div className="bg-[#6366f1] px-8 py-6 text-center text-white">
                            <h1 className="text-2xl font-semibold">
                                Add vehicle info
                            </h1>
                            <p className="mt-1 text-xs opacity-90">
                                Join RockAuto and start shopping
                            </p>
                        </div>

                        {/* Form body */}
                        <div className="px-8 py-8">
                            {/* Year / Make */}
                            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="2021"
                                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700">
                                        Make
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Honda"
                                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                    />
                                </div>
                            </div>

                            {/* Model / Engine */}
                            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700">
                                        Model
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Civic"
                                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700">
                                        Engine
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="2.0L"
                                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                    />
                                </div>
                            </div>

                            {/* VIN */}
                            <div className="mb-4">
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    VIN{' '}
                                    <span className="text-gray-400">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Vehicle Identification Number"
                                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                />
                            </div>

                            {/* Nickname */}
                            <div className="mb-4">
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    Nickname{' '}
                                    <span className="text-gray-400">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 'Civic Daily'"
                                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                />
                            </div>

                            {/* Default vehicle checkbox */}
                            <div className="mb-6">
                                <label className="flex items-center gap-2 text-xs text-gray-700">
                                    <input
                                        type="checkbox"
                                        className="h-3.5 w-3.5 rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                                    />
                                    <span>Set as my default vehicle</span>
                                </label>
                            </div>

                            {/* Buttons: Skip / Save & Continue */}
                            <div className="mb-4 flex gap-3">
                                <Link
                                    href="/dashboard/profile"
                                    className="flex w-1/2 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    Skip for now
                                </Link>
                                <Link
                                    href="/dashboard/profile"
                                    className="flex w-1/2 items-center justify-center rounded-lg bg-[#6366f1] py-3 text-sm font-medium text-white hover:bg-[#4f46e5]"
                                >
                                    Save &amp; Continue
                                </Link>
                            </div>

                            {/* Back to login link (small text at bottom) */}
                            <p className="mt-2 text-center text-[11px] text-gray-500">
                                <Link
                                    href="/account/login"
                                    className="hover:underline"
                                >
                                    ← Back to login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
