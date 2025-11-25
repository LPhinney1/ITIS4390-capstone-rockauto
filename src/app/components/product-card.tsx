import AddToCartButton from '../ui_new/button';

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
            className={`rounded-xl border bg-blue-200 shadow ${
                product.outOfStock ? 'opacity-60' : 'transition hover:shadow-lg'
            }`}
        >
            <div className="h-28 w-full overflow-hidden rounded-t-xl">
                <img
                    src={product.image}
                    className="h-full w-full object-cover"
                    alt={product.name}
                />
            </div>
            <div className="p-3">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-blue-600">{product.price}</p>

                <div className="mt-2 flex w-full justify-end">
                    {product.outOfStock ? (
                        <div className="w-min rounded-md bg-gray-600 px-3 py-1 text-xs text-white">
                            Out of Stock
                        </div>
                    ) : (
                        <AddToCartButton />
                    )}
                </div>
            </div>
        </div>
    );
}
