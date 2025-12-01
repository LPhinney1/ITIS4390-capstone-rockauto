import VehicleCard from '@/app/components/vehicle-card';
import {
    X,
    Lock,
    Car,
    ShoppingBag,
    ArrowLeft,
    Truck,
    Shield,
    Tag,
    AlertCircle,
    Link as LinkIcon,
} from 'lucide-react';
import { ProductCardCart } from '@/app/components/product-card';
import { cartList } from '../../dashboard/cart/cartItems';
import TesterData from '@/app/components/tester-data';

export default function Page() {
    const promoApplied = false;
    const cartItems = cartList; //replace with list of cart items
    const subtotal = 250.0;
    const quantity = 1;

    // Calculations
    // const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeShippingThreshold = 50;
    const shipping = subtotal >= freeShippingThreshold ? 0 : 9.99;
    const promoDiscount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
    const estimatedTax = (subtotal - promoDiscount) * 0.08;
    const total = subtotal - promoDiscount + shipping + estimatedTax;

    // Empty cart state
    if (cartItems.length == 0 || cartItems == null) {
        return (
            <div className="flex-1">
                <TesterData />
                <div className="mx-auto max-w-[1400px] px-8 py-12">
                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <ShoppingBag className="h-12 w-12 text-gray-400" />
                        </div>
                        <h2 className="mb-3 text-[32px] text-gray-900">
                            Your Cart is Empty
                        </h2>
                        <p className="mb-8 max-w-md text-center text-gray-600">
                            Looks like you haven't added any parts to your cart
                            yet. Start shopping to find the perfect parts for
                            your vehicle.
                        </p>
                        <button
                            // onClick={onContinueShopping}
                            className="rounded-lg bg-[#6366f1] px-8 py-4 text-white transition-colors hover:bg-[#4f46e5]"
                        >
                            Browse Products
                        </button>

                        {/* Trust Badges */}
                        <div className="mt-16 grid max-w-2xl grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <Truck className="h-6 w-6 text-green-600" />
                                </div>
                                <p className="text-sm text-gray-600">
                                    Free Shipping Over $50
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <Shield className="h-6 w-6 text-blue-600" />
                                </div>
                                <p className="text-sm text-gray-600">
                                    Secure Checkout
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                    <Car className="h-6 w-6 text-purple-600" />
                                </div>
                                <p className="text-sm text-gray-600">
                                    Quality Parts
                                </p>
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
                {/* Header */}
                <div className="mb-6">
                    <h1 className="mb-2 text-[40px] text-gray-900">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600">
                        {cartItems.length}{' '}
                        {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>
                {/* Main Content Grid */}
                <VehicleCard />
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Cart Items - Left Column (2/3) */}
                    <div className="space-y-4 lg:col-span-2">
                        {cartItems.map((item) => (
                            <ProductCardCart
                                key={item.Product.id}
                                product={item.Product}
                                quantity={quantity}
                                // Handlers can be wired to app state or client components later
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

                    {/* Order Summary - Right Column (1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Order Summary Card */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-6 text-[20px] text-gray-900">
                                    Order Summary
                                </h3>

                                {/* Promo Code */}
                                <div className="mb-6">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                // value={promoCode}
                                                // onChange={(e) => setPromoCode(e.target.value)}
                                                placeholder="Promo code"
                                                // disabled={promoApplied}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6366f1] disabled:bg-gray-100 disabled:text-gray-500"
                                            />
                                            <Tag className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        </div>
                                        {/* {promoApplied ? ( */}
                                        {/* <button
                         // onClick={() => {
                         //   setPromoApplied(false);
                         //   setPromoCode('');
                         // }}
                         className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors whitespace-nowrap"
                       >
                         Remove
                       </button>
                       ) : ( */}
                                        <button
                                            // onClick={handleApplyPromo}
                                            className="whitespace-nowrap rounded-lg bg-gray-900 px-6 py-2.5 text-white transition-colors hover:bg-gray-800"
                                        >
                                            Apply
                                        </button>
                                        {/* )} */}
                                    </div>
                                    {/* {promoApplied && (
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Promo code applied successfully!
                    </p>
                  )} */}
                                </div>

                                {/* Summary Items */}
                                <div className="mb-6 space-y-3">
                                    <div className="flex justify-between text-gray-700">
                                        <span>
                                            Subtotal ({cartItems.length}{' '}
                                            {cartItems.length === 1
                                                ? 'item'
                                                : 'items'}
                                            )
                                        </span>
                                        {/* <span>${subtotal.toFixed(2)}</span> */}{' '}
                                        <span>$250.00</span>
                                    </div>

                                    {/* {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )} */}

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
                                        <span>Estimated Tax</span>
                                        <span>${estimatedTax.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                {/* <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[20px] text-gray-900">Total</span>
                    <span className="text-[28px] text-[#6366f1]">${total.toFixed(2)}</span>
                  </div>
                </div> */}

                                {/* Checkout Button */}
                                <button
                                    // onClick={onCheckout}
                                    className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#6366f1] py-4 text-white transition-all hover:bg-[#4f46e5] hover:shadow-lg"
                                >
                                    <Lock className="h-5 w-5" />
                                    <span>Proceed to Checkout</span>
                                </button>

                                {/* Security Message */}
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                                        <div>
                                            <p className="mb-1 text-xs text-gray-700">
                                                Secure Checkout
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Your payment information is
                                                encrypted and secure
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                                    <Truck className="mx-auto mb-2 h-6 w-6 text-green-600" />
                                    <p className="text-xs text-gray-700">
                                        Free Shipping
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Orders over $50
                                    </p>
                                </div>
                                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                                    <Shield className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                                    <p className="text-xs text-gray-700">
                                        Secure Payment
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        SSL Encrypted
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
