import '@/app/ui_new/global.css';
import { inter } from '@/app/ui_new/fonts';
import NavBar from './components/navbar';
import type { Metadata } from 'next';

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
            <body className={`${inter.className} antialiased`}>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
