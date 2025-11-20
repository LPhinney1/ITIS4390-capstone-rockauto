"use client";
import clsx from 'clsx';
import React, { useState } from 'react';

interface AddToCartButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  productName?: string;
}

export default function AddToCartButton({ onClick, disabled, productName }: AddToCartButtonProps) {
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
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={added}
      aria-label={disabled ? 'Out of stock' : added ? 'Added' : 'Add to cart'}
      className={clsx(
        'w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ',
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : added
          ? 'bg-blue-600 text-lg'
          : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 focus-visible:ring-blue-400'
      )}
    >
      {added ? '✓' : '+'}
    </button>
  );
}


// // Interactive Add to Cart button
// export function AddToCartButton({
//   onClick,
//   disabled,
// }: {
//   onClick?: () => void;
//   disabled?: boolean;
// }) {
//   const [added, setAdded] = useState(false);

//   function handleClick() {
//     if (disabled) return;
//     onClick?.();
//     setAdded(true);
//     // revert visual state after a short delay
//     setTimeout(() => setAdded(false), 1200);
//   }

//   return (
//     <button
//       type="button"
//       onClick={handleClick}
//       disabled={disabled}
//       aria-pressed={added}
//       aria-label={disabled ? 'Out of stock' : added ? 'Added' : 'Add to cart'}
//       className={clsx(
//         'w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors',
//         disabled ? 'bg-gray-400 cursor-not-allowed' : (added ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700')
//       )}
//     >
//       {added ? '✓' : '+'}
//     </button>
//   );
// }
