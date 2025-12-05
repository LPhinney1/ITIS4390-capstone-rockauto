import AddToCartButton from '../ui_new/button';
import QuantitySelect from './quantity-select';

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
    return (
        <div
            className={`rounded-xl border bg-blue-200 shadow ${product.outOfStock ? 'opacity-60' : 'transition hover:shadow-lg'}`}
        >
            <div className="h-28 w-full overflow-hidden rounded-t-xl">
                <img
                    src={product.image}
                    className="h-full w-full object-cover"
                    alt={product.name}
                />
            </div>
            <div className="p-2">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-blue-600">${product.price}</p>

                <div className="mt-2 flex w-full justify-end">
                    {product.outOfStock ? (
                        <div className="rounded-md bg-gray-600 px-3 py-1 text-xs text-white">
                            Out of Stock
                        </div>
                    ) : (
                        <AddToCartButton
                            productName={product.name}
                            buttonStyle={'small round'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export function ProductCardHome({ product, onAdd }: ProductCardProps) {
    return (
        <div
            className={`h-[240px] w-[300px] overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-lg ${
                product.outOfStock
                    ? 'cursor-default opacity-70'
                    : 'cursor-pointer'
            } group`}
        >
            <div className="relative flex h-full w-full flex-col p-2">
                <div className="mb-1 flex flex-1 items-center justify-center overflow-hidden rounded">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>

                {/* Product Info */}
                <div className="flex items-center justify-between gap-1">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-gray-900">
                            {product.name}
                        </p>
                        <p className="text-xs text-[#6366f1]">
                            ${product.price}
                        </p>
                    </div>

                    {/* Add to Cart Button (client component) */}
                    <div className="shrink-0">
                        <AddToCartButton
                            disabled={!!product.outOfStock}
                            productName={product.name}
                            buttonStyle="small round"
                        />
                    </div>
                </div>

                {/* Out of Stock Badge */}
                {product.outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="rounded bg-[#ef4444] px-2 py-1 text-xs text-white">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>
        </div>
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
            <div className="flex gap-6">
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
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 6h18" />
                                <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
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
            </div>
        </div>
    );
}
