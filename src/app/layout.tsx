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
      <body className="bg-[#f5f5f7] antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
        </AuthProvider>

        <footer className="bg-[#3d3e4f] text-white py-5 mt-12">
          <div className="mx-48 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2024 RockAuto. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-sm hover:underline">Privacy Policy</span>
              <span className="text-sm hover:underline">Terms of Service</span>
              <span className="text-sm hover:underline">Contact Us</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
