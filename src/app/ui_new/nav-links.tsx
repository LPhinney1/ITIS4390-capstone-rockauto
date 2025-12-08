'use client';
import { ShoppingCart, User, GitCompare, Car } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/account/auth-provider';




export default function NavLinks() {
    const auth = useAuth();

    const links = [
        { href: '/dashboard/garage', icon: Car },
        { href: '/dashboard/compare', icon: GitCompare },
        { href: '/dashboard/cart', icon: ShoppingCart },
        { href: `/account/${auth.signedIn ? 'profile' : 'login'}`, icon: User },
    ];
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-label={link.href}
                        className="relative bg-[#5b5fc7] rounded-lg w-9 h-9 flex items-center justify-center hover:bg-[#4a4db5] transition-colors"
                    >
                        <LinkIcon className="w-5 h-5 text-white" />
                    </Link>
                );
            })}
        </>
    );
}
