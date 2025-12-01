import VehicleCard from '@/app/components/vehicle-card';
import { X, Lock, Car, ShoppingBag, ArrowLeft, Truck, Shield, Tag, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { ProductCardCart } from '@/app/components/product-card';
import { cartList } from '../../dashboard/cart/cartItems';
import TesterData from '@/app/components/tester-data';

export default function Page() {
  const promoApplied = false;
  const cartItems = cartList; //replace with list of cart items
  const subtotal = 250.00;
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
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-[32px] text-gray-900 mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md text-center">
              Looks like you haven't added any parts to your cart yet. Start shopping to find the perfect parts for your vehicle.
            </p>
            <button
              // onClick={onContinueShopping}
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-4 rounded-lg transition-colors"
            >
              Browse Products
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Free Shipping Over $50</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Secure Checkout</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Car className="w-6 h-6 text-purple-600" />
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
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[40px] text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        {/* Main Content Grid */}
            <VehicleCard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <ProductCardCart
                key={item.Product.id}
                product={item.Product}
                quantity={quantity}
                // Handlers can be wired to app state or client components later
              />
            ))}


            {subtotal < freeShippingThreshold && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-blue-900 mb-1">Almost there!</h4>
                    <p className="text-sm text-blue-700">
                      Add <span className="font-semibold">${(freeShippingThreshold - subtotal).toFixed(2)}</span> more to your order to qualify for <span className="font-semibold">FREE shipping</span>!
                    </p>
                    <div className="mt-3 bg-white rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )
            }
          </div>

          {/* Order Summary - Right Column (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-[20px] text-gray-900 mb-6">Order Summary</h3>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        // value={promoCode}
                        // onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        // disabled={promoApplied}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] disabled:bg-gray-100 disabled:text-gray-500"
                      />
                      <Tag className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
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
                      className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors whitespace-nowrap"                      >
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
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                    {/* <span>${subtotal.toFixed(2)}</span> */} <span>$250.00</span>
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
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">FREE</span>
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
                  className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white py-4 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2 mb-4"
                >
                  <Lock className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </button>

                {/* Security Message */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-700 mb-1">Secure Checkout</p>
                      <p className="text-xs text-gray-600">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-700">Free Shipping</p>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
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


