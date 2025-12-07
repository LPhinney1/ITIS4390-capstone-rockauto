'use client';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth-provider';


// export const currUser

import { Vehicle } from '@/app/components/vehicle-form';
export interface Useree {
    name: string;
    email: string;
    password: string;
    MyCars: Vehicle[];
}



export default function Page() {
    const router = useRouter();
    const auth = useAuth();



    const createAccount = (name: string, email: string, password: string): Useree => {
        const newUser: Useree = {
            name,
            email,
            password,
            MyCars: [],
        };
        console.log('Account created for:', name);
        toast.success(`Signed in as ${name}!`, { duration: 2000 });
        return newUser;
    };


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleSignedUp() {
        // set a simple cookie to represent auth state for the demo route `/api/auth/status`
        document.cookie = 'signedIn=1; path=/';
        // update auth provider state
        try {
            auth.setUser(createAccount(name, email, password));
            auth.setSignedIn(true);

            toast.success(`Signed in as ${name}!`, { duration: 2000 });
        } catch (e) {
            // ignore if provider not present
        }
        router.push('/account/profile');

    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createAccount(name, email, password);
        setError(null);
        if (!name.trim() || !email.trim() || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        handleSignedUp();
    };


    return (
        <div className="flex-1 flex items-center justify-center p-8 bg-[#f5f5f7]">
            <div className="w-full max-w-[480px]">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary px-8 py-8 text-center">
                        <h1 className="text-[32px] text-white mb-2">Create an account</h1>
                        <p className="text-[16px] text-white/90">Click Google for test data</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-[14px] text-gray-700 mb-2">Full name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full h-[48px] pl-10 pr-4 bg-white border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[14px] text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-[48px] pl-10 pr-4 bg-white border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-[14px] text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-[48px] pl-10 pr-12 bg-white border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm" className="block text-[14px] text-gray-700 mb-2">Confirm password</label>
                                <input
                                    id="confirm"
                                    type="password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    className="w-full h-[48px] pl-3 pr-3 bg-white border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all"
                                    placeholder="Repeat your password"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full h-[48px] bg-primary hover:bg-[#4f46e5] text-white rounded-lg transition-colors mt-6 grid place-items-center"
                            >
                                <span className="text-[16px]">Create account</span>
                            </button>
                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-[14px]">
                                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => { setName('John Doe'), setEmail('john.doe@gmail.com'), setPassword('password123'), setConfirm('password123'); }}
                                    type="button"
                                    className="h-[48px] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span className="text-[14px] text-gray-700">Google</span>
                                </button>
                                <button
                                    type="button"
                                    className="h-[48px] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <span className="text-[14px] text-gray-700">Facebook</span>
                                </button>
                            </div>
                        </form>


                        {/* Sign In Link */}

                        <div className="mt-6 text-center">
                            <p className="text-[14px] text-gray-600">
                                Already have an account?{' '}
                                <Link href='/account/login'
                                    className="text-[#6366f1] hover:text-[#4f46e5] transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        {/* Back Button */}
                        <div className="mt-4 text-center">
                            <Link
                                href='/'
                                className="text-[14px] text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ← Back to shop
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
