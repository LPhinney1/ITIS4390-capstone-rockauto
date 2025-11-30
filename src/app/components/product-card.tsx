import AddToCartButton from "../ui_new/button";


type Product = {
  name: string;
  image: string;
  price: string | number;
  outOfStock?: boolean;
};

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export default function ProductCardUser({ product, onAdd }: ProductCardProps) {
  return (
    <div
      className={`rounded-xl shadow border bg-blue-200 ${product.outOfStock ? 'opacity-60' : 'hover:shadow-lg transition'
        }`}
    >
      <div className="h-28 w-full rounded-t-xl overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
      </div>
      <div className="p-2">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-blue-600">{product.price}</p>

        <div className="w-full flex justify-end mt-2">
          {product.outOfStock ? (
            <div className="px-3 py-1 bg-gray-600 text-white text-xs rounded-md">Out of Stock</div>
          ) : (
            <AddToCartButton />
          )}
        </div>
      </div>
    </div>
  );
}



export function ProductCardHome({ product, onAdd }: ProductCardProps) {
  const formattedPrice =
    typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;

  return (
    <div
      className={`bg-white rounded-lg w-[150px] h-[120px] overflow-hidden shadow-sm hover:shadow-lg border border-gray-200 transition-all ${product.outOfStock ? 'opacity-70 cursor-default' : 'cursor-pointer'
        } group`}
    >
      <div className="relative w-full h-full p-2 flex flex-col">
        {/* Product Image */}
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
            <p className="text-xs text-[#6366f1]">{formattedPrice}</p>
          </div>

          {/* Add to Cart Button (client component) */}
          <div className="shrink-0">
            <AddToCartButton disabled={!!product.outOfStock} productName={product.name} />
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
