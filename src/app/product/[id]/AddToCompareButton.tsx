'use client';

import { useRouter } from 'next/navigation';

interface AddToCompareButtonProps {
    productId: number;
    className?: string;
}

export default function AddToCompareButton({ productId, className = '' }: AddToCompareButtonProps) {
    const router = useRouter();

    const handleAddToCompare = () => {
        // Get current comparison list from localStorage
        const stored = localStorage.getItem('compareList');
        let compareIds: string[] = stored ? JSON.parse(stored) : [];
        
        const productIdStr = String(productId);
        
        // Check if product is already in comparison
        if (compareIds.includes(productIdStr)) {
            // Already in comparison, just navigate
            router.push(`/dashboard/compare/${compareIds.join('/')}`);
            return;
        }
        
        // Add to comparison (max 3 products)
        if (compareIds.length >= 3) {
            alert('You can only compare up to 3 products at a time. Please remove a product first.');
            router.push(`/dashboard/compare/${compareIds.join('/')}`);
            return;
        }
        
        compareIds.push(productIdStr);
        localStorage.setItem('compareList', JSON.stringify(compareIds));
        
        // Navigate to comparison page
        router.push(`/dashboard/compare/${compareIds.join('/')}`);
    };

    return (
        <button
            onClick={handleAddToCompare}
            className={`h-12 rounded-full bg-gray-900 px-10 text-sm font-semibold tracking-wide text-white shadow hover:bg-black flex items-center justify-center ${className}`}
        >
            COMPARE
        </button>
    );
}