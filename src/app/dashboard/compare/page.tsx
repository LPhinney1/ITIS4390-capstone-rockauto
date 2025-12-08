import React from 'react';
import { ShoppingCart } from 'lucide-react';

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

    // ---------- EMPTY STATE (same styling as Cart empty state) ----------
    if (idList.length === 0) {
        return (
            <div className="flex-1">
                <div className="mx-auto max-w-[1400px] px-8 py-12">
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <ShoppingCart className="h-12 w-12 text-gray-400" />
                        </div>
                        <h2 className="mb-3 text-[32px] text-gray-900">
                            No products to compare
                        </h2>
                        <p className="mb-8 max-w-md text-center text-gray-600">
                            Add products to comparison by clicking the
                            &quot;Compare&quot; button on any product.
                        </p>
                        <a
                            href="/"
                            className="rounded-lg bg-[#6366f1] px-8 py-4 text-white transition-colors hover:bg-[#4f46e5]"
                        >
                            Browse Products
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // ---------- WHEN THERE ARE PRODUCTS TO COMPARE ----------
    const products = await Promise.all(idList.map((id) => fetchPart(id)));

    return (
        <div className="flex-1">
            <div className="mx-auto max-w-[1400px] px-8 py-12">
                <h1 className="mb-8 text-center text-[32px] text-gray-900">
                    Compare Products
                </h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {idList.map((id, i) => {
                        const p = products[i];
                        return (
                            <div
                                key={id}
                                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                {p ? (
                                    <>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {p.product_name}
                                        </h2>

                                        {p.product_image_url && (
                                            <img
                                                src={p.product_image_url}
                                                alt={p.product_name}
                                                className="mt-3 h-32 w-full rounded-md bg-gray-50 object-contain"
                                            />
                                        )}

                                        <p className="mt-3 text-sm text-gray-700">
                                            {p.product_description}
                                        </p>

                                        <p className="mt-3 text-base font-semibold text-gray-900">
                                            ${p.price}
                                        </p>

                                        <div className="mt-2 text-xs text-gray-500">
                                            Category ID: {p.category_id}
                                            <br />
                                            Vehicle ID: {p.vehicle_id}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-600">
                                        Product not found for ID: {id}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
