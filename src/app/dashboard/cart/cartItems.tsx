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

export const cartList: CartItem[] = [];

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
}

export function clearCart() {
    cartList.length = 0;
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
