//this is what keeps track of what the customer has in their cart

import { Product } from '@/app/components/product-card';
import { MyCars } from '@/app/dashboard/garage/page';
import { Vehicle } from '@/app/components/vehicle-card';
import { categories } from '@/app/placeholder-data';

export interface CartItem {
    Product: Product;
    quantity: number;
    car: Vehicle;
}

// Load cart from localStorage on initialization (browser only)
function loadCartFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem('cartList');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// Save cart to localStorage
function saveCartToStorage(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem('cartList', JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
}

export const cartList: CartItem[] = loadCartFromStorage();

export function addToCart(product: Product, quantity: number = 1) {
    const defaultVehicle: Vehicle = {
        id: 0,
        year: '',
        make: '',
        model: '',
        engine: '',
    };

    const existing = cartList.find(
        (item) => item.Product.id === product.id && item.car.id === defaultVehicle.id
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        cartList.push({
            Product: product,
            quantity,
            car: defaultVehicle,
        });
    }

    saveCartToStorage(cartList);
}

// Add all placeholder categories into the cart list (used for testing/demo)
export function addCategoriesToCart() {
    const defaultVehicle: Vehicle = {
        id: 0,
        year: '',
        make: '',
        model: '',
        engine: '',
    };

    const targetCar = MyCars[0] ?? defaultVehicle;

    categories.forEach((c) => {
        // push a shallow copy so callers can mutate quantity independently
        cartList.push({
            Product: c as unknown as Product,
            quantity: 1,
            car: targetCar,
        });
    });

    saveCartToStorage(cartList);
}

export function clearCart() {
    cartList.length = 0;
    saveCartToStorage(cartList);
}

export function removeFromCart(productId: number): void {
    const stored = localStorage.getItem('cartList');
    const cart: CartItem[] = stored ? JSON.parse(stored) : [];
    
    const index = cart.findIndex(item => item.Product.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        // Save back to localStorage
        localStorage.setItem('cartList', JSON.stringify(cart));
        
        // Also update the in-memory array
        cartList.length = 0;
        cartList.push(...cart);
    }
}

export function updateQuantity(productId: number, newQuantity: number): void {
    // Load from localStorage
    const stored = localStorage.getItem('cartList');
    const cart: CartItem[] = stored ? JSON.parse(stored) : [];
    
    const item = cart.find(item => item.Product.id === productId);
    if (item) {
        item.quantity = newQuantity;
        // Save back to localStorage
        localStorage.setItem('cartList', JSON.stringify(cart));
        
        // Also update the in-memory array
        cartList.length = 0;
        cartList.push(...cart);
    }
}

export default function CartItems() {
    return (
        <div>
            <p>Cart Items Component</p>
            <p>Number of Cars in Garage: {MyCars.length}</p>
            <p>First Car in Garage: {MyCars[0]?.name}</p>
        </div>
    );
}
