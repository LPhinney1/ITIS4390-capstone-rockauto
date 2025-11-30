"use client";
import clsx from 'clsx';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface AddToCartButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  productName?: string;
  buttonStyle?: string;
}



export function ContinueShoppingButton() {
  return (
    <button
      type="button"
      onClick={() => (window.location.href = '/home')}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
    >
       <ArrowLeft className="w-5 h-5" />
    <span>Continue Shopping</span>
    </button>
  );
}

export default function AddToCartButton({ onClick, disabled, productName, buttonStyle }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (disabled) return;
    try {
      onClick?.();
    } catch (e) {
      // swallow run-time errors from parent handlers
    }
    setAdded(true);
    console.log('Product added:', productName);
    // show a toast so the user gets feedback immediately
    // showToast(
    //   <div className="flex items-center gap-2">
    //     <span className="font-medium">{productName ? `${productName} added to cart` : 'Added to cart'}</span>
    //   </div>,
    //   2200,
    // );
    // revert visual state after a short delay
    // setTimeout(() => setAdded(false), 1200);
  }


  //three basic button styles: default, small round, large rectangular
  const sizeClass = buttonStyle === 'small round' ? 'w-7 h-7' : buttonStyle === 'large rectangular' ? 'px-5 py-3' : 'px-4 py-2';
  //  console.log('sizeClass:', sizeClass);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={added}
      aria-label={disabled ? 'Out of stock' : added ? 'Added' : 'Add to cart'}
      className={clsx(
        'rounded-full flex justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ',
        sizeClass,
        disabled ? 'bg-gray-400 cursor-not-allowed' :
          added ? 'bg-blue-600 text-lg' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 focus-visible:ring-blue-400'
      )}
    >
      {added ? '✓' : '+'}
    </button>
  );
}