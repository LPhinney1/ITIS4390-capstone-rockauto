import '@/app/ui_new/global.css';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-48">
            <div className="-mx-10 mt-20">
                <Link
                    href="/"
                    className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
                >
                    ← Continue Shopping
                </Link>
            </div>
            {children}
        </div>
    );
}
