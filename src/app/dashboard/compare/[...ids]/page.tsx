import React from 'react';

export const dynamic = 'force-dynamic';

async function fetchPart(id: string) {
    const res = await fetch(`http://localhost:3000/api/parts/${id}`, {
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

    if (idList.length === 0) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Compare Products</h1>
                <p className="mt-4 text-sm text-gray-600">
                    No product IDs provided.
                </p>
            </div>
        );
    }

    const products = await Promise.all(idList.map((id) => fetchPart(id)));

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">Compare Products</h1>
            <div className="flex flex-col space-y-6">
                {idList.map((id, i) => {
                    const p = products[i];
                    return (
                        <div
                            key={i}
                            className="rounded-lg border bg-white p-4 shadow-sm"
                        >
                            {p ? (
                                <>
                                    <h2 className="text-lg font-semibold">
                                        {p.product_name}
                                    </h2>
                                    {p.product_image_url && (
                                        <img
                                            src={p.product_image_url}
                                            alt={p.product_name}
                                            className="mt-2 h-40 w-full object-contain"
                                        />
                                    )}
                                    <p className="mt-2 text-sm">
                                        {p.product_description}
                                    </p>
                                    <p className="mt-2 font-bold">${p.price}</p>
                                    <div className="mt-2 text-xs text-gray-500">
                                        Category ID: {p.category_id}
                                        <br />
                                        Vehicle ID: {p.vehicle_id}
                                    </div>
                                </>
                            ) : (
                                <p>Product not found for ID: {id}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
