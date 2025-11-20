import AddToCartButton from "../ui_new/button";


type Product = {
  name: string;
  image: string;
  price: string;
  outOfStock?: boolean;
};

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div
      className={`rounded-xl shadow border bg-blue-200 ${
        product.outOfStock ? 'opacity-60' : 'hover:shadow-lg transition'
      }`}
    >
      <div className="h-28 w-full rounded-t-xl overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
      </div>
      <div className="p-3">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-blue-600">{product.price}</p>

        <div className="w-full flex justify-end mt-2">
          {product.outOfStock ? (
            <div className="px-3 py-1 w-min bg-gray-600 text-white text-xs rounded-md">Out of Stock</div>
          ) : (
            <AddToCartButton />
          )}
        </div>
      </div>
    </div>
  );
}
