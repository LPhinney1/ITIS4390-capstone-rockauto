import React from 'react';

interface Part {
    id: number;
    vehicle_id: number;
    category_id: number;
    product_name: string;
    product_description: string | null;
    price: number | null;
    product_image_url: string | null;
}

interface PageProps {
    params: { id: string };
}

async function fetchPart(id: string): Promise<Part> {
    const res = await fetch(`http://localhost:3000/api/parts/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch part data');
    }
    return res.json();
}

export default async function ProductPage({ params }: PageProps) {
    const part = await fetchPart(params.id);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{part.product_name}</h1>
            {part.product_image_url && (
                <img
                    src={part.product_image_url}
                    alt={part.product_name}
                    style={{ maxWidth: '600px' }}
                />
            )}
            <p>ID: {part.id}</p>
            <p>Vehicle ID: {part.vehicle_id}</p>
            <p>Category ID: {part.category_id}</p>
            <p>Description: {part.product_description || 'N/A'}</p>
            <p>Price: {part.price !== null ? `$${part.price}` : 'N/A'}</p>
        </div>
    );
}
