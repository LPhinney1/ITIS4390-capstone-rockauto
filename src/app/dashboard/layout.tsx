import '@/app/ui_new/global.css';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-48">
            <div className="-mx-10 mt-6 mb-3">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
                >
                    <b>← Continue Shopping</b>
                </Link>
            </div>
            {children}
        </div>
    );
}
