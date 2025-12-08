'use client';
import clsx from 'clsx';
import React, { useState } from 'react';

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
            className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
        >
            <span>← Back to Shopping</span>
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



    // three basic button styles: default, small round, large rectangular
    const sizeClass =
        buttonStyle === 'small round'
            ? 'w-6 h-6 rounded-full'
            : buttonStyle === 'large rectangular'
              ? 'w-full px-4 py-3 rounded-[6px] text-sm'
              : 'px-4 py-2 rounded-full';

    return (
        <button
            type="button"
            onClick={() => {
            if (disabled) return;
            handleClick();
            setTimeout(() => setAdded(false), 1200);
            }}
            disabled={disabled}
            aria-pressed={added}
            aria-label={
            disabled ? 'Out of stock' : added ? 'added' : 'add to cart'
            }
            className={clsx(
            'flex justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 items-center',
            sizeClass,
            disabled
                ? 'cursor-not-allowed bg-gray-400'
                : added
                  ? 'bg-primary-600 text-lg'
                  : 'bg-primary hover:bg-primary-600 focus-visible:ring-primary active:bg-primary-700',
            )}
        >
            {added ? '✓' : buttonStyle === 'large rectangular' ? 'Add to cart' : '+'}
        </button>
    );
  }
