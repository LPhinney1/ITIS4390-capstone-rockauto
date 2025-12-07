// src/app/dashboard/create-account/page.tsx
import Link from "next/link";

export default function CreateAccountPage() {
    return (
        <main className="flex-1 bg-[#f5f5fb]">
            <div className="mx-auto max-w-7xl px-4">
                {/* Back link */}
    
                {/* Centered card */}
                <div className="flex min-h-[calc(100vh-220px)] items-center justify-center">
                    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                        {/* Header */}
                        <div className="bg-[#6366f1] px-8 py-6 text-center text-white">
                            <h1 className="text-2xl font-semibold">Create Account</h1>
                            <p className="mt-1 text-xs opacity-90">
                                Join RockAuto and start shopping
                            </p>
                        </div>

                        {/* Form */}
                        <div className="px-8 py-8">
                            {/* First / Last name */}
                            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-[#6366f1]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-[#6366f1]"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="mb-1 block text-xs text-gray-700">Email Address</label>
                                <div className="flex items-center rounded-lg border border-gray-300 px-3">
                                    <span className="mr-2 text-sm text-gray-400">@</span>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="h-10 w-full border-none text-sm focus:ring-0"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label className="mb-1 block text-xs text-gray-700">
                                    Phone Number <span className="text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-[#6366f1]"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="mb-1 block text-xs text-gray-700">Password</label>
                                <div className="flex items-center rounded-lg border border-gray-300 px-3">
                                    <span className="mr-2">🔒</span>
                                    <input
                                        type="password"
                                        placeholder="Create a password"
                                        className="h-10 w-full border-none text-sm focus:ring-0"
                                    />
                                    <button className="ml-2 text-xs text-gray-400"></button>
                                </div>
                                <p className="mt-1 text-[10px] text-gray-500">Must be at least 8 characters</p>
                            </div>

                            {/* Confirm */}
                            <div className="mb-4">
                                <label className="mb-1 block text-xs text-gray-700">Confirm Password</label>
                                <div className="flex items-center rounded-lg border border-gray-300 px-3">
                                    <span className="mr-2">🔒</span>
                                    <input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="h-10 w-full border-none text-sm focus:ring-0"
                                    />
                                    <button className="ml-2 text-xs text-gray-400"></button>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="mb-5">
                                <label className="flex items-start gap-2 text-[11px] text-gray-700">
                                    <input
                                        type="checkbox"
                                        className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#6366f1]"
                                    />
                                    <span>
                                        I agree to the{" "}
                                        <a className="text-[#6366f1] hover:underline">Terms of Service</a>{" "}
                                        and{" "}
                                        <a className="text-[#6366f1] hover:underline">Privacy Policy</a>
                                    </span>
                                </label>
                            </div>

                            {/* Create → Add Vehicle */}
                            <Link
                                href="/dashboard/add-vehicle"
                                className="mb-5 flex w-full items-center justify-center rounded-lg bg-[#6366f1] py-3 text-sm font-medium text-white hover:bg-[#4f46e5]"
                            >
                                Create Account
                            </Link>

                            {/* Divider */}
                            <div className="mb-5 flex items-center gap-3 text-[11px] text-gray-400">
                                <div className="h-px flex-1 bg-gray-200" />
                                <span>Or sign up with</span>
                                <div className="h-px flex-1 bg-gray-200" />
                            </div>

                            {/* Social login */}
                            <div className="mb-6 flex gap-3">
                                <button className="flex w-1/2 items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 text-xs font-medium hover:bg-gray-50">
                                    Google
                                </button>
                                <button className="flex w-1/2 items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 text-xs font-medium hover:bg-gray-50">
                                    Facebook
                                </button>
                            </div>

                            {/* Already have account */}
                            <p className="text-center text-[11px] text-gray-600">
                                Already have an account?{" "}
                                <Link href="/dashboard/login" className="text-[#6366f1] hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
