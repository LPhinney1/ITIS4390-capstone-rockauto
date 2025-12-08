import React from 'react';
import { redirect } from 'next/navigation';
import ComparisonClientWrapper from './ComparisonClientWrapper';

export const dynamic = 'force-dynamic';

async function fetchPart(id: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/parts/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
}

export default async function ComparePage({
    params,
}: {
    params: { ids?: string[] };
}) {
    const idList = params.ids ?? [];

    // Limit to 3 products max
    const limitedIds = idList.slice(0, 3);

    if (limitedIds.length === 0) {
        redirect('/dashboard/compare');
    }

    // Fetch all products
    const products = await Promise.all(limitedIds.map((id) => fetchPart(id)));

    return (
        <ComparisonClientWrapper
            initialProducts={products}
            initialIds={limitedIds}
        />
    );
}
