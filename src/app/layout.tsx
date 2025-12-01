import '@/app/ui_new/global.css';
import type { Metadata } from 'next';
import NavBar from './components/navbar';

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
            <body className="bg-[#f5f5f7] antialiased">
                <NavBar />
                {children}
            </body>
        </html>
    );
}
