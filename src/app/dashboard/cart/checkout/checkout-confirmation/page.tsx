'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Package, Calendar, Truck, MapPin, Mail, Phone, CreditCard, Download } from 'lucide-react';

export default function CheckoutConfirmationPage() {
    const router = useRouter();
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('currentOrder');
        if (!stored) {
            router.push('/dashboard/cart');
            return;
        }
        setOrderData(JSON.parse(stored));
    }, [router]);

    if (!orderData) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    return (
        <div className="min-h-screen bg-gray-50 pt-4 pb-8 px-4">
            <div className="mx-auto max-w-4xl">
                {/* Success Header */}
                <div className="mb-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
                    <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
                </div>

                {/* Order Info Cards */}
                <div className="mb-6 rounded-2xl bg-indigo-500 p-6 text-white shadow-lg">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="text-center">
                            <Package className="mx-auto mb-2 h-8 w-8" />
                            <p className="mb-1 text-sm opacity-90">Order Number</p>
                            <p className="text-lg font-bold">{orderData.orderNumber}</p>
                        </div>
                        <div className="text-center">
                            <Calendar className="mx-auto mb-2 h-8 w-8" />
                            <p className="mb-1 text-sm opacity-90">Estimated Delivery</p>
                            <p className="text-lg font-bold">
                                {estimatedDelivery.toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                })}
                            </p>
                        </div>
                        <div className="text-center">
                            <Truck className="mx-auto mb-2 h-8 w-8" />
                            <p className="mb-1 text-sm opacity-90">Shipping Status</p>
                            <p className="text-lg font-bold">Processing</p>
                        </div>
                    </div>
                </div>

                {/* Order Timeline */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Order Timeline</h2>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                            </div>
                            <div className="flex-1 pb-6">
                                <p className="font-semibold text-gray-900">Order Placed</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(orderData.orderDate).toLocaleString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                    })}
                                </p>
                                <p className="mt-1 text-xs text-green-600">✓ Completed</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                                    <Package className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                            </div>
                            <div className="flex-1 pb-6">
                                <p className="font-semibold text-gray-900">Processing Order</p>
                                <p className="text-sm text-gray-500">Preparing your items for shipment</p>
                                <p className="mt-1 text-xs text-indigo-600">• In Progress</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                    <Truck className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                            </div>
                            <div className="flex-1 pb-6">
                                <p className="font-semibold text-gray-500">Shipped</p>
                                <p className="text-sm text-gray-400">Expected within 1-2 business days</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                    <MapPin className="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-500">Delivered</p>
                                <p className="text-sm text-gray-400">
                                    Expected by {estimatedDelivery.toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric', 
                                        year: 'numeric' 
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Ordered Items */}
                    <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold">Ordered Items</h2>
                        <div className="space-y-4">
                            {orderData.items.map((item: any) => (
                                <div key={item.Product.id} className="flex gap-4 rounded-lg border border-gray-200 p-4">
                                    <img
                                        src={item.Product.image || '/placeholder.png'}
                                        alt={item.Product.name}
                                        className="h-20 w-20 rounded-lg object-cover bg-gray-100"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{item.Product.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            Part #: {String(item.Product.id).padStart(6, '0')}
                                        </p>
                                        {item.Product.category && (
                                            <p className="text-sm text-gray-500">Category: {item.Product.category}</p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">${item.Product.price}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                        
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">${orderData.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Shipping
                                    {orderData.shipping === 0 && (
                                        <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                            FREE
                                        </span>
                                    )}
                                </span>
                                <span className="font-medium">${orderData.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium">${orderData.tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total Paid</span>
                                    <span className="text-2xl font-bold text-indigo-500">
                                        ${orderData.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                            <Download className="h-5 w-5" />
                            Download Receipt
                        </button>

                        <button
                            onClick={() => router.push('/')}
                            className="mt-3 w-full rounded-lg bg-indigo-500 py-3 text-white font-semibold hover:bg-indigo-600 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>

                {/* Customer Information */}
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {/* Shipping Address */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="mb-3 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-indigo-500" />
                            <h3 className="text-lg font-semibold">Shipping Address</h3>
                        </div>
                        <div className="text-sm text-gray-700">
                            <p className="font-medium">{orderData.contactInfo.firstName} {orderData.contactInfo.lastName}</p>
                            <p className="mt-2">{orderData.shippingAddress.street}</p>
                            <p>
                                {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
                            </p>
                            <p>{orderData.shippingAddress.country}</p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="mb-3 flex items-center gap-2">
                            <Mail className="h-5 w-5 text-indigo-500" />
                            <h3 className="text-lg font-semibold">Contact Information</h3>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span>{orderData.contactInfo.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span>{orderData.contactInfo.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-2">
                        <div className="mb-3 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-indigo-500" />
                            <h3 className="text-lg font-semibold">Payment Method</h3>
                        </div>
                        <div className="text-sm text-gray-700">
                            <p className="font-medium">Credit Card</p>
                            <p className="mt-1">{orderData.paymentInfo.cardNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 p-6">
                    <h3 className="mb-2 font-semibold text-blue-900">Need Help?</h3>
                    <p className="mb-4 text-sm text-blue-700">
                        If you have any questions about your order, please contact our support team.
                    </p>
                    <button className="rounded-lg bg-indigo-500 px-6 py-2 text-white font-semibold hover:bg-indigo-600 transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}