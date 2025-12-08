import AddToCartButton from '../ui_new/button';
import QuantitySelect from './quantity-select';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export interface Product {
    name: string;
    image?: string;
    price?: string | number;
    outOfStock?: boolean;
    id?: number | string;
    category?: string;
}

interface ProductCardProps {
    product: Product;
    onAdd?: (product: Product) => void;
}

export default function ProductCardUser({ product, onAdd }: ProductCardProps) {
    const inStock = !product.outOfStock;
    const priceNum = Number(product.price ?? 0);
  
    return (
      <Link href={`/product/${product.id}`}>
        <div
          key={product.id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary transition-all cursor-pointer overflow-hidden group"
        >
          {/* Product Image */}
          <div className="h-[200px] bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
  
          {/* Product Info */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-gray-900 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
              {product.category && (
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              )}
              <div className="flex items-center justify-between">
                <p className="text-[20px] text-primary">${priceNum.toFixed(2)}</p>
                {inStock ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200">In Stock</span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-red-100 text-red-800 border border-red-200">Out of Stock</span>
                )}
              </div>
            </div>
  
            {/* Add to Cart Button */}
            <AddToCartButton
              disabled={!!product.outOfStock}
              productName={product.name}
              buttonStyle="large rectangular"
            />
          </div>
        </div>
      </Link>
    );
  }

export function ProductCardHome({ product, onAdd }: ProductCardProps) {
    return (
      <div
        className={` rounded-lg w-[200px] h-[150px] overflow-hidden shadow-sm hover:shadow-lg border border-gray-200 transition-all ${product.outOfStock ? 'opacity-70 cursor-default' : 'cursor-pointer'
          } group`} >
        <div className="relative w-full h-full p-2 flex flex-col">
          <div className="flex-1 flex items-center justify-center mb-1 overflow-hidden rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
  
          {/* Product Info */}
          <div className="flex items-center justify-between gap-1">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-gray-900">
                {product.name}
              </p>
              <p className="text-xs text-primary">
                ${product.price}
              </p>
            </div>
  
            {/* Add to Cart Button (client component) */}
            <div className="shrink-0">
              <AddToCartButton disabled={!!product.outOfStock} productName={product.name} buttonStyle='small round' />
            </div>
          </div>
  
          {/* Out of Stock Badge */}
          {product.outOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-[#ef4444] text-white px-2 py-1 rounded text-xs">Out of Stock</span>
            </div>
          )}
        </div>
      </div>
      //{/* </Link> */}
    );
  }

// Cart-specific card used on the cart page. Renders the detailed layout
// previously duplicated in `dashboard/cart/page.tsx`. Handlers are optional.
export function ProductCardCart({
    product,
    quantity = 1,
    onRemove,
    onQuantityChange,
}: {
    product: Product;
    quantity?: number;
    onRemove?: () => void;
    onQuantityChange?: (qty: number) => void;
}) {
    return (
        <div className="hovered:shadow-lg group rounded-xl border border-gray-200 bg-white p-6 transition-all">
            <Link href={`/product/${product.id}`} className="flex gap-6">
                {/* Product Image */}
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                   <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col">
                    {/* Header Row */}
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="mb-1 text-[22px] text-gray-900 transition-colors group-hover:text-[#6366f1]">
                                {product.name}
                            </h3>
                            <p className="mb-1 text-sm text-gray-600">
                                Part #:{' '}
                                {product.id
                                    ? String(product.id).padStart(6, '0')
                                    : '—'}
                            </p>
                            {product.category && (
                                <p className="text-sm text-gray-500">
                                    Category: {product.category}
                                </p>
                            )}
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={onRemove}
                            className="rounded-lg p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600"
                            aria-label="Remove item"
                        >
                         <Trash2 className="w-5 h-5" />   
                        </button>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                        {product.outOfStock ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs text-red-800">
                                <svg
                                    className="h-3 w-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                </svg>
                                Out of Stock
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs text-green-800">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                In Stock
                            </span>
                        )}
                    </div>

                    {/* Bottom Row - Quantity and Price */}
                    <div className="mt-auto flex items-center justify-between">
                        {/* Quantity Selector */}
                        <QuantitySelect
                            productId={product.id}
                            quantity={quantity}
                            onUpdateQuantity={(id, nextQty) => {
                                if (onQuantityChange && nextQty !== undefined) {
                                    onQuantityChange(nextQty);
                                }
                            }}
                        />

                        {/* Price */}
                        <div className="text-right">
                            <p className="text-[24px] text-[#6366f1]">
                                ${product.price}
                            </p>
                            {(quantity || 1) > 1 && (
                                <p className="text-xs text-gray-500">
                                    ${product.price} each
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}



export function ProductCardResults({ product, onAdd }: ProductCardProps) {
    return (
        <div className="hovered:shadow-lg group rounded-xl border border-gray-200 bg-white p-6 transition-all">
            <Link href={`/product/${product.id}`} className="flex gap-6">
                {/* Product Image */}
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                   <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col">
                    {/* Header Row */}
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="mb-1 text-[22px] text-gray-900 transition-colors group-hover:text-[#6366f1]">
                                {product.name}
                            </h3>
                            <p className="mb-1 text-sm text-gray-600">
                                Part #:{' '}
                                {product.id
                                    ? String(product.id).padStart(6, '0')
                                    : '—'}
                            </p>
                            {product.category && (
                                <p className="text-sm text-gray-500">
                                    Category: {product.category}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                        {product.outOfStock ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs text-red-800">
                                <svg
                                    className="h-3 w-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                </svg>
                                Out of Stock
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs text-green-800">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                In Stock
                            </span>
                        )}
                    </div>


                </div>
            </Link>
        </div>
    );
}
