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
                        className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#5b5fc7] transition-colors hover:bg-[#4a4db5]"
                    >
                        <LinkIcon className="h-5 w-5 text-white" />
                    </Link>
                );
            })}
        </>
    );
}
