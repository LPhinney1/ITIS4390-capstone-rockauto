'use client';
import { addCategoriesToCart } from '@/app/dashboard/cart/cartItems';
import { useState } from 'react';

export default function TesterData() {
    const [added, setAdded] = useState(false);

    function handleAdd() {
        try {
            addCategoriesToCart();
            setAdded(true);
            // simple feedback for developer/testing
            console.log('Test items added to cart');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <button
            onClick={handleAdd}
            className="rounded-lg bg-[#6366f1] px-4 py-2 text-white transition-colors hover:bg-[#4f46e5]"
        >
            {added ? 'Test Items Added' : 'Add Tester Data'}
        </button>
    );
}
