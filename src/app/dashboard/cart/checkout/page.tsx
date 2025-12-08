'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { CartItem } from '../cartItems';

export default function CheckoutPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Form state
    const [contactInfo, setContactInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardholderName: '',
        expiryDate: '',
        cvv: '',
        sameAsShipping: true,
    });

    useEffect(() => {
        const stored = localStorage.getItem('cartList');
        const items = stored ? JSON.parse(stored) : [];
        setCartItems(items);
    }, [router]);

    const subtotal = cartItems.reduce((sum, item) => {
        const price = (item.Product as any).price;
        const numericPrice =
            typeof price === 'string' ? parseFloat(price) : (price ?? 0);
        return sum + numericPrice * item.quantity;
    }, 0);

    const shipping = subtotal >= 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleContinueToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        // Store order info in localStorage
        const orderData = {
            contactInfo,
            shippingAddress,
            paymentInfo: {
                ...paymentInfo,
                cardNumber:
                    '•••• •••• •••• ' + paymentInfo.cardNumber.slice(-4),
            },
            items: cartItems,
            subtotal,
            shipping,
            tax,
            total,
            orderNumber:
                'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            orderDate: new Date().toISOString(),
        };

        localStorage.setItem('currentOrder', JSON.stringify(orderData));

        // Clear cart
        localStorage.setItem('cartList', JSON.stringify([]));

        // Navigate to confirmation
        router.push('/dashboard/cart/checkout/checkout-confirmation');
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 pb-8 pt-4">
            <div className="mx-auto max-w-6xl">
                {/* Back button */}
                <button
                    onClick={() =>
                        step === 1 ? router.push('/dashboard/cart') : setStep(1)
                    }
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to {step === 1 ? 'Cart' : 'Contact Info'}
                </button>

                {/* Progress indicator */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <div className="flex items-center">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                        >
                            {step > 1 ? <Check className="h-5 w-5" /> : '1'}
                        </div>
                        <span className="ml-2 text-sm font-medium">
                            Contact
                        </span>
                    </div>
                    <div className="h-0.5 w-16 bg-gray-300"></div>
                    <div className="flex items-center">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                        >
                            2
                        </div>
                        <span className="ml-2 text-sm font-medium">
                            Payment
                        </span>
                    </div>
                    <div className="h-0.5 w-16 bg-gray-300"></div>
                    <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-gray-600">
                            3
                        </div>
                        <span className="ml-2 text-sm font-medium">
                            Confirm
                        </span>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2">
                        {step === 1 ? (
                            <form onSubmit={handleContinueToPayment}>
                                <h1 className="mb-8 text-3xl font-bold">
                                    Contact & Shipping Information
                                </h1>

                                {/* Contact Information */}
                                <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
                                            1
                                        </div>
                                        <h2 className="text-xl font-semibold">
                                            Contact Information
                                        </h2>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                First Name{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={contactInfo.firstName}
                                                onChange={(e) =>
                                                    setContactInfo({
                                                        ...contactInfo,
                                                        firstName:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="John"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Last Name{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={contactInfo.lastName}
                                                onChange={(e) =>
                                                    setContactInfo({
                                                        ...contactInfo,
                                                        lastName:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="Doe"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Email Address{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={contactInfo.email}
                                                onChange={(e) =>
                                                    setContactInfo({
                                                        ...contactInfo,
                                                        email: e.target.value,
                                                    })
                                                }
                                                placeholder="john.doe@example.com"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Phone Number{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={contactInfo.phone}
                                                onChange={(e) =>
                                                    setContactInfo({
                                                        ...contactInfo,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                placeholder="(555) 123-4567"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="rounded-2xl bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
                                            2
                                        </div>
                                        <h2 className="text-xl font-semibold">
                                            Shipping Address
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Street Address{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={shippingAddress.street}
                                                onChange={(e) =>
                                                    setShippingAddress({
                                                        ...shippingAddress,
                                                        street: e.target.value,
                                                    })
                                                }
                                                placeholder="123 Main Street, Apt 4B"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                    City{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={shippingAddress.city}
                                                    onChange={(e) =>
                                                        setShippingAddress({
                                                            ...shippingAddress,
                                                            city: e.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder="New York"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                    State{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={
                                                        shippingAddress.state
                                                    }
                                                    onChange={(e) =>
                                                        setShippingAddress({
                                                            ...shippingAddress,
                                                            state: e.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder="NY"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                    ZIP Code{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={shippingAddress.zip}
                                                    onChange={(e) =>
                                                        setShippingAddress({
                                                            ...shippingAddress,
                                                            zip: e.target.value,
                                                        })
                                                    }
                                                    placeholder="10001"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                    Country{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={
                                                        shippingAddress.country
                                                    }
                                                    onChange={(e) =>
                                                        setShippingAddress({
                                                            ...shippingAddress,
                                                            country:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-4 font-semibold text-white transition-colors hover:bg-indigo-600"
                                >
                                    Continue to Payment
                                    <span>→</span>
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handlePlaceOrder}>
                                <h1 className="mb-8 text-3xl font-bold">
                                    Payment Information
                                </h1>

                                {/* Payment Method */}
                                <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
                                            1
                                        </div>
                                        <h2 className="text-xl font-semibold">
                                            Payment Method
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Card Number{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={paymentInfo.cardNumber}
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        cardNumber:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Cardholder Name{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={
                                                    paymentInfo.cardholderName
                                                }
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        cardholderName:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="JOHN DOE"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                    Expiry Date{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={
                                                        paymentInfo.expiryDate
                                                    }
                                                    onChange={(e) =>
                                                        setPaymentInfo({
                                                            ...paymentInfo,
                                                            expiryDate:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                    CVV{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={paymentInfo.cvv}
                                                    onChange={(e) =>
                                                        setPaymentInfo({
                                                            ...paymentInfo,
                                                            cvv: e.target.value,
                                                        })
                                                    }
                                                    placeholder="123"
                                                    maxLength={4}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                                        <div className="flex items-start gap-3">
                                            <Check className="mt-0.5 h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="text-sm font-medium text-green-900">
                                                    Your payment is secure
                                                </p>
                                                <p className="text-xs text-green-700">
                                                    We use industry-standard
                                                    encryption to protect your
                                                    payment information.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Billing Address */}
                                <div className="rounded-2xl bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
                                            2
                                        </div>
                                        <h2 className="text-xl font-semibold">
                                            Billing Address
                                        </h2>
                                    </div>

                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={paymentInfo.sameAsShipping}
                                            onChange={(e) =>
                                                setPaymentInfo({
                                                    ...paymentInfo,
                                                    sameAsShipping:
                                                        e.target.checked,
                                                })
                                            }
                                            className="h-4 w-4 rounded text-indigo-500 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium">
                                            Same as shipping address
                                        </span>
                                    </label>

                                    {paymentInfo.sameAsShipping && (
                                        <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                                            <p>{shippingAddress.street}</p>
                                            <p>
                                                {shippingAddress.city},{' '}
                                                {shippingAddress.state}{' '}
                                                {shippingAddress.zip}
                                            </p>
                                            <p>{shippingAddress.country}</p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-4 font-semibold text-white transition-colors hover:bg-indigo-600"
                                >
                                    <Check className="h-5 w-5" />
                                    Place Order
                                    <span>→</span>
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 rounded-2xl bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
                                    i
                                </div>
                                <h3 className="text-xl font-semibold">
                                    Order Summary
                                </h3>
                            </div>

                            {cartItems.map((item) => (
                                <div
                                    key={item.Product.id}
                                    className="mb-3 text-sm"
                                >
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">
                                            {item.Product.name} x{item.quantity}
                                        </span>
                                        <span className="font-medium">
                                            $
                                            {(
                                                (item.Product.price as number) *
                                                item.quantity
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div className="my-4 border-t border-gray-200"></div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span className="flex items-center gap-2">
                                        Shipping
                                        {shipping === 0 && (
                                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                                FREE
                                            </span>
                                        )}
                                    </span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="my-4 border-t border-gray-200"></div>

                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">
                                    Total
                                </span>
                                <span className="text-2xl font-bold text-indigo-500">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
