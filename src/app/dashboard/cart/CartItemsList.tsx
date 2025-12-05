'use client';

import { ProductCardCart, Product } from '@/app/components/product-card';
import { CartItem, removeFromCart, updateQuantity } from './cartItems';
import { Truck } from 'lucide-react';

interface CartItemsListProps {
    items: CartItem[];
    subtotal: number;
    freeShippingThreshold: number;
}

export default function CartItemsList({ 
    items, 
    subtotal, 
    freeShippingThreshold
}: CartItemsListProps) {
    
    const handleRemove = (productId: number | string | undefined) => {
        if (!productId) return;
        const id = typeof productId === 'string' ? parseInt(productId) : productId;
        removeFromCart(id);
        window.location.reload();
    };
    
    const handleQuantityChange = (productId: number | string | undefined, newQuantity: number) => {
        if (!productId) return;
        const id = typeof productId === 'string' ? parseInt(productId) : productId;
        
        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            updateQuantity(id, newQuantity);
        }
        window.location.reload();
    };

    return (
        <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
                <ProductCardCart
                    key={item.Product.id}
                    product={item.Product}
                    quantity={item.quantity}
                    onRemove={() => handleRemove(item.Product.id)}
                    onQuantityChange={(newQuantity) => 
                        handleQuantityChange(item.Product.id, newQuantity)
                    }
                />
            ))}

            {subtotal < freeShippingThreshold && (
                <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                            <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="mb-1 text-blue-900">
                                Almost there!
                            </h4>
                            <p className="text-sm text-blue-700">
                                Add{' '}
                                <span className="font-semibold">
                                    $
                                    {(
                                        freeShippingThreshold -
                                        subtotal
                                    ).toFixed(2)}
                                </span>{' '}
                                more to your order to qualify for{' '}
                                <span className="font-semibold">
                                    FREE shipping
                                </span>
                                !
                            </p>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{
                                        width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}