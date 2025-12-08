import '@/app/ui_new/global.css';
import type { Metadata } from 'next';
import NavBar from './components/navbar';
import AuthProvider from '@/app/account/auth-provider';

export const metadata: Metadata = {
    title: 'RockAuto',
    description: 'All the parts your car will ever need',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            {/* Flex column, full height */}
            <body className="flex min-h-screen flex-col bg-[#f5f5f7] antialiased">
                <AuthProvider>
                    <NavBar />
                    <main className="flex-1">{children}</main>
                </AuthProvider>

                <footer className="mt-12 bg-[#3d3e4f] py-5 text-white">
                    <div className="mx-48 flex flex-col items-center justify-between md:flex-row">
                        <p className="text-sm">
                            © 2024 RockAuto. All rights reserved.
                        </p>
                        <div className="mt-4 flex space-x-4 md:mt-0">
                            <span className="text-sm hover:underline">
                                Privacy Policy
                            </span>
                            <span className="text-sm hover:underline">
                                Terms of Service
                            </span>
                            <span className="text-sm hover:underline">
                                Contact Us
                            </span>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
