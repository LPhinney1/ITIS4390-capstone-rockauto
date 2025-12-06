'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VehicleCard from '@/app/components/vehicle-card';
import { Lock, Car, ShoppingBag, Truck, Shield, Tag } from 'lucide-react';
import { Product } from '@/app/components/product-card';
import { CartItem, addToCart } from './cartItems';
import CartItemsList from './CartItemsList';

interface Part {
    id: number;
    vehicle_id: number;
    category_id: number;
    product_name: string;
    product_description: string | null;
    price: number | string | null;
    product_image_url: string | null;
}

async function fetchPart(id: string): Promise<Part> {
    const res = await fetch(`/api/parts/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch part data');
    return res.json();
}

function CartContent() {
    const searchParams = useSearchParams();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);
    const hasAddedProduct = useRef(false);

    useEffect(() => {
        const productId = searchParams.get('productId');

        const loadCart = async () => {
            if (productId && !hasAddedProduct.current) {
                hasAddedProduct.current = true;

                try {
                    const part = await fetchPart(productId);
                    const adaptedProduct = {
                        ...(part as any),
                        id: part.id,
                        name: part.product_name,
                        product_name: part.product_name,
                        imageUrl: part.product_image_url ?? '/placeholder.png',
                        image: part.product_image_url ?? '/placeholder.png',
                        product_image_url: part.product_image_url ?? '/placeholder.png',
                    };
                    addToCart(adaptedProduct as Product, 1);
                } catch (error) {
                    console.error('Failed to add product to cart:', error);
                }

                window.history.replaceState({}, '', '/dashboard/cart');
            }

            const stored = localStorage.getItem('cartList');
            const items = stored ? JSON.parse(stored) : [];
            setCartItems(items);
            setMounted(true);
        };

        loadCart();
    }, [searchParams]);

    if (!mounted) {
        return <div className="flex-1 p-12">Loading...</div>;
    }

    const promoApplied = false;
    const subtotal = cartItems.reduce((sum, item) => {
        const price = (item.Product as any).price;
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price ?? 0;
        return sum + numericPrice * item.quantity;
    }, 0);

    const freeShippingThreshold = 50;
    const shipping = subtotal >= freeShippingThreshold ? 0 : 9.99;
    const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
    const estimatedTax = (subtotal - promoDiscount) * 0.08;

    if (cartItems.length === 0) {
        return (
            <div className="flex-1">
                <div className="mx-auto max-w-[1400px] px-8 py-12">
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <ShoppingBag className="h-12 w-12 text-gray-400" />
                        </div>
                        <h2 className="mb-3 text-[32px] text-gray-900">Your Cart is Empty</h2>
                        <p className="mb-8 max-w-md text-center text-gray-600">
                            Looks like you haven't added any parts to your cart yet. Start shopping to find the perfect parts for your vehicle.
                        </p>
                        <a href="/" className="rounded-lg bg-[#6366f1] px-8 py-4 text-white transition-colors hover:bg-[#4f46e5]">
                            Browse Products
                        </a>

                        <div className="mt-16 grid max-w-2xl grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <Truck className="h-6 w-6 text-green-600" />
                                </div>
                                <p className="text-sm text-gray-600">Free Shipping Over $50</p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <Shield className="h-6 w-6 text-blue-600" />
                                </div>
                                <p className="text-sm text-gray-600">Secure Checkout</p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                    <Car className="h-6 w-6 text-purple-600" />
                                </div>
                                <p className="text-sm text-gray-600">Quality Parts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <div className="max-w-[1400px] items-center">
                <div className="mb-6">
                    <h1 className="mb-2 text-[40px] text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-600">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <VehicleCard />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <CartItemsList
                        items={cartItems}
                        subtotal={subtotal}
                        freeShippingThreshold={freeShippingThreshold}
                    />

                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-6 text-[20px] text-gray-900">Order Summary</h3>

                                <div className="mb-6">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder="Promo code"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                            />
                                            <Tag className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <button className="whitespace-nowrap rounded-lg bg-gray-900 px-6 py-2.5 text-white transition-colors hover:bg-gray-800">
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-6 space-y-3">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-700">
                                        <span className="flex items-center gap-2">
                                            Shipping
                                            {shipping === 0 && (
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">FREE</span>
                                            )}
                                        </span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-700">
                                        <span>Estimated Tax</span>
                                        <span>${estimatedTax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#6366f1] py-4 text-white transition-all hover:bg-[#4f46e5] hover:shadow-lg">
                                    <Lock className="h-5 w-5" />
                                    <span>Proceed to Checkout</span>
                                </button>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                                        <div>
                                            <p className="mb-1 text-xs text-gray-700">Secure Checkout</p>
                                            <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                                    <Truck className="mx-auto mb-2 h-6 w-6 text-green-600" />
                                    <p className="text-xs text-gray-700">Free Shipping</p>
                                    <p className="text-xs text-gray-500">Orders over $50</p>
                                </div>
                                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                                    <Shield className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                                    <p className="text-xs text-gray-700">Secure Payment</p>
                                    <p className="text-xs text-gray-500">SSL Encrypted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CartContent />
        </Suspense>
    );
}
