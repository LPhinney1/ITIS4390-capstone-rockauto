'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Product {
    id: number;
    product_name: string;
    product_description: string | null;
    price: number | string | null;
    product_image_url: string | null;
    category_id: number;
    vehicle_id: number;
}

interface ComparisonClientWrapperProps {
    initialProducts: (Product | null)[];
    initialIds: string[];
}

export default function ComparisonClientWrapper({
    initialProducts,
    initialIds,
}: ComparisonClientWrapperProps) {
    const router = useRouter();
    const [products, setProducts] =
        useState<(Product | null)[]>(initialProducts);
    const [compareIds, setCompareIds] = useState<string[]>(initialIds);

    // Sync with localStorage
    useEffect(() => {
        const stored = localStorage.getItem('compareList');
        if (stored) {
            const ids = JSON.parse(stored);
            if (
                ids.length > 0 &&
                JSON.stringify(ids) !== JSON.stringify(compareIds)
            ) {
                // Redirect to update URL
                router.push(`/dashboard/compare/${ids.join('/')}`);
            }
        } else if (compareIds.length > 0) {
            localStorage.setItem('compareList', JSON.stringify(compareIds));
        }
    }, []);

    const handleRemove = (id: string) => {
        const newIds = compareIds.filter((i) => i !== id);
        if (newIds.length === 0) {
            localStorage.removeItem('compareList');
            router.push('/dashboard/compare');
        } else {
            localStorage.setItem('compareList', JSON.stringify(newIds));
            router.push(`/dashboard/compare/${newIds.join('/')}`);
        }
    };

    const handleBrowseMore = () => {
        // Store current comparison in localStorage before navigating
        localStorage.setItem('compareList', JSON.stringify(compareIds));
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white px-8 py-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Product Comparison
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Comparing {products.length} products
                                </p>
                            </div>
                        </div>
                        {products.length < 3 && (
                            <button
                                onClick={handleBrowseMore}
                                className="rounded-lg bg-indigo-500 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
                            >
                                Browse more products to compare
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-8 py-8">
                {/* Product Cards Grid */}
                <div
                    className={`grid gap-6 ${products.length === 1 ? 'mx-auto max-w-md md:grid-cols-1' : products.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
                >
                    {products.map((product, index) => {
                        if (!product) return null;

                        const inStock = Math.random() > 0.5; // Replace with actual stock data

                        return (
                            <div
                                key={product.id}
                                className="rounded-lg border border-gray-200 bg-white shadow-sm"
                            >
                                {/* Remove Button */}
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            handleRemove(String(product.id))
                                        }
                                        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>

                                    {/* Product Image */}
                                    <div className="h-56 w-full overflow-hidden rounded-t-lg bg-gray-100">
                                        <img
                                            src={
                                                product.product_image_url ||
                                                '/placeholder.png'
                                            }
                                            alt={product.product_name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-4 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {product.product_name}
                                    </h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">
                                                Part #
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {product.id}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">
                                                Manufacturer
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                AutoParts Co.
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">
                                                Category
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {product.category_id === 1
                                                    ? 'Brakes'
                                                    : 'Engine Parts'}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">
                                                Price
                                            </span>
                                            <span className="text-lg font-bold text-indigo-600">
                                                ${product.price}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">
                                                Availability
                                            </span>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                            >
                                                {inStock
                                                    ? 'In Stock'
                                                    : 'Out of Stock'}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">
                                                Shipping
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                2-3 Business Days
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="mb-2">
                                            <span className="text-sm font-semibold text-gray-700">
                                                Compatible Vehicles
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            Most{' '}
                                            {product.category_id === 1
                                                ? 'Brakes'
                                                : 'Engine Parts'}{' '}
                                            applications
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="mb-2">
                                            <span className="text-sm font-semibold text-gray-700">
                                                Description
                                            </span>
                                        </div>
                                        <p className="line-clamp-3 text-xs text-gray-600">
                                            {product.product_description ||
                                                'Premium quality engine parts component designed for reliability and performance. Manufactured to OEM specifications with rigorous quality control standards.'}
                                        </p>
                                    </div>

                                    <button
                                        disabled={!inStock}
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/cart?productId=${product.id}`,
                                            )
                                        }
                                        className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                                            inStock
                                                ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                                                : 'cursor-not-allowed bg-gray-300 text-gray-500'
                                        }`}
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Detailed Comparison Table */}
                <div className="mt-12">
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                        Detailed Comparison
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border-b border-gray-200 px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Specification
                                    </th>
                                    {products.map((product) => (
                                        <th
                                            key={product?.id}
                                            className="border-b border-l border-gray-200 px-6 py-4 text-center text-sm font-semibold text-gray-900"
                                        >
                                            {product?.product_name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr>
                                    <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-500">
                                        Price
                                    </td>
                                    {products.map((product) => (
                                        <td
                                            key={`price-${product?.id}`}
                                            className="border-b border-l border-gray-200 px-6 py-4 text-center text-sm font-semibold text-indigo-600"
                                        >
                                            ${product?.price}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-500">
                                        Part Number
                                    </td>
                                    {products.map((product) => (
                                        <td
                                            key={`part-${product?.id}`}
                                            className="border-b border-l border-gray-200 px-6 py-4 text-center text-sm text-gray-900"
                                        >
                                            {product?.id}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-500">
                                        Category
                                    </td>
                                    {products.map((product) => (
                                        <td
                                            key={`cat-${product?.id}`}
                                            className="border-b border-l border-gray-200 px-6 py-4 text-center text-sm text-gray-900"
                                        >
                                            {product?.category_id === 1
                                                ? 'Brakes'
                                                : 'Engine Parts'}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-500">
                                        Manufacturer
                                    </td>
                                    {products.map((product) => (
                                        <td
                                            key={`mfr-${product?.id}`}
                                            className="border-b border-l border-gray-200 px-6 py-4 text-center text-sm text-gray-900"
                                        >
                                            AutoParts Co.
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-500">
                                        Availability
                                    </td>
                                    {products.map((product) => {
                                        const inStock = Math.random() > 0.5;
                                        return (
                                            <td
                                                key={`stock-${product?.id}`}
                                                className="border-b border-l border-gray-200 px-6 py-4 text-center"
                                            >
                                                <span
                                                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                                >
                                                    {inStock
                                                        ? 'In Stock'
                                                        : 'Out of Stock'}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-500">
                                        Shipping Time
                                    </td>
                                    {products.map((product) => (
                                        <td
                                            key={`ship-${product?.id}`}
                                            className="border-b border-l border-gray-200 px-6 py-4 text-center text-sm text-gray-900"
                                        >
                                            2-3 Business Days
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        Compatibility
                                    </td>
                                    {products.map((product) => (
                                        <td
                                            key={`compat-${product?.id}`}
                                            className="border-l border-gray-200 px-6 py-4 text-center text-sm text-gray-900"
                                        >
                                            Most{' '}
                                            {product?.category_id === 1
                                                ? 'Brakes'
                                                : 'Engine Parts'}{' '}
                                            applications
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add More Products Section */}
                {products.length < 3 && (
                    <div className="mt-12 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Add a Third Product
                        </h3>
                        <p className="mb-6 text-sm text-gray-500">
                            Select another product to add to your comparison
                        </p>
                        <button
                            onClick={handleBrowseMore}
                            className="rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
                        >
                            Browse Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
