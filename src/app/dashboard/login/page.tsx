// src/app/dashboard/login/page.tsx
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="flex-1 bg-[#f5f5fb]">
            <div className="mx-auto max-w-7xl px-4">
                {/* Back link */}
    
                {/* Centered card */}
                <div className="flex min-h-[calc(100vh-220px)] items-center justify-center">
                    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                        {/* Purple header */}
                        <div className="bg-[#6366f1] px-8 py-6 text-center text-white">
                            <h1 className="text-2xl font-semibold">Welcome Back</h1>
                            <p className="mt-1 text-xs opacity-90">
                                Sign in to your RockAuto account
                            </p>
                        </div>

                        {/* Form */}
                        <div className="px-8 py-8">
                            {/* Email */}
                            <div className="mb-4">
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="flex items-center rounded-lg border border-gray-300 px-3">
                                    <span className="mr-2 text-sm text-gray-400">@</span>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="h-10 w-full border-none text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="flex items-center rounded-lg border border-gray-300 px-3">
                                    <span className="mr-2 text-sm text-gray-400">🔒</span>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="h-10 w-full border-none text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                                    />
                                    <button
                                        type="button"
                                        className="ml-2 text-xs text-gray-400"
                                    >
                                        
                                    </button>
                                </div>
                            </div>

                            {/* Remember + forgot */}
                            <div className="mb-5 flex items-center justify-between">
                                <label className="flex items-center gap-2 text-xs text-gray-600">
                                    <input
                                        type="checkbox"
                                        className="h-3.5 w-3.5 rounded border-gray-300 text-[#6366f1]"
                                    />
                                    Remember me
                                </label>
                                <button className="text-xs text-[#6366f1] hover:underline">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Sign In → Add Vehicle */}
                            <Link
                                href="/dashboard/add-vehicle"
                                className="mb-5 flex w-full items-center justify-center rounded-lg bg-[#6366f1] py-3 text-center text-sm font-medium text-white transition hover:bg-[#4f46e5]"
                            >
                                Sign In
                            </Link>

                            {/* Divider */}
                            <div className="mb-5 flex items-center gap-3 text-[11px] text-gray-400">
                                <div className="h-px flex-1 bg-gray-200" />
                                <span>Or continue with</span>
                                <div className="h-px flex-1 bg-gray-200" />
                            </div>

                            {/* Social */}
                            <div className="mb-6 flex gap-3">
                                <button className="flex w-1/2 items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                                    Google
                                </button>
                                <button className="flex w-1/2 items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                                    Facebook
                                </button>
                            </div>

                            {/* Sign up */}
                            <p className="text-center text-[11px] text-gray-600">
                                Don't have an account?{" "}
                                <Link href="/dashboard/create-account" className="text-[#6366f1] hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
