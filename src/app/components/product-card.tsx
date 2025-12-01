import AddToCartButton from "../ui_new/button";
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
    <div className={`rounded-xl shadow border bg-blue-200 ${product.outOfStock ? 'opacity-60' : 'hover:shadow-lg transition'}`}
    >
      <div className="h-28 w-full rounded-t-xl overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
      </div>
      <div className="p-2">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-blue-600">${product.price}</p>

        <div className="w-full flex justify-end mt-2">
          {product.outOfStock ? (
            <div className="px-3 py-1 bg-gray-600 text-white text-xs rounded-md">Out of Stock</div>
          ) : (
            <AddToCartButton productName={product.name} buttonStyle={'small round'} />
          )}
        </div>
      </div>
    </div>
  );
}



export function ProductCardHome({ product, onAdd }: ProductCardProps) {
  return (
    <div
      className={` rounded-lg w-[150px] h-[120px] overflow-hidden shadow-sm hover:shadow-lg border border-gray-200 transition-all ${product.outOfStock ? 'opacity-70 cursor-default' : 'cursor-pointer'
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
          <div className="flex-1 min-w-0">
            <p className="text-xs truncate text-gray-900">{product.name}</p>
            <p className="text-xs text-[#6366f1]">${product.price}</p>
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
  );
}

// Cart-specific card used on the cart page. Renders the detailed layout
// previously duplicated in `dashboard/cart/page.tsx`. Handlers are optional.
export function ProductCardCart({ product, quantity = 1, }: {
  product: Product;
  quantity?: number;
  // onRemove?: (id?: number | string) => void;
  // onUpdateQuantity?: (id?: number | string, nextQty?: number) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hovered:shadow-lg transition-all group">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col">
          {/* Header Row */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-[22px] text-gray-900 mb-1 group-hover:text-[#6366f1] transition-colors">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-1">Part #: {product.id ? String(product.id).padStart(6, '0') : '—'}</p>
              {product.category && <p className="text-sm text-gray-500">Category: {product.category}</p>}
            </div>

            {/* Remove Button */}
            <button
              // onClick={() => onRemove?.(product.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
            </button>
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            {product.outOfStock ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-red-100 text-red-800 border border-red-200">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                Out of Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                In Stock
              </span>
            )}
          </div>

          {/* Bottom Row - Quantity and Price */}
          <div className="flex justify-between items-center mt-auto">
            {/* Quantity Selector */}
            <QuantitySelect
              productId={product.id}
              quantity={quantity}
            // onUpdateQuantity={onUpdateQuantity}
            />

            {/* Price */}
            <div className="text-right">
              <p className="text-[24px] text-[#6366f1]">${product.price}</p>
              {(quantity || 1) > 1 && <p className="text-xs text-gray-500">${product.price} each</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
