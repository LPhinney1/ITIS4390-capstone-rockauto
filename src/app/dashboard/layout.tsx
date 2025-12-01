import '@/app/ui_new/global.css';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-48">
      <div className="mt-20 -mx-10">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6">
          ← Continue Shopping
        </Link>
      </div>
        {children}
    </div>
  );
}