'use client';

type QuantitySelectProps = {
    productId?: number | string;
    quantity?: number;
    onUpdateQuantity?: (id?: number | string, nextQty?: number) => void;
    className?: string;
};

export function QuantitySelect({
    productId,
    quantity = 1,
    onUpdateQuantity,
    className = '',
}: QuantitySelectProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="text-sm text-gray-600">Quantity:</span>
            <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                <button
                    onClick={() =>
                        onUpdateQuantity?.(
                            productId,
                            Math.max(1, (quantity || 1) - 1),
                        )
                    }
                    className="flex h-10 w-10 items-center justify-center text-gray-600 transition-colors hover:bg-gray-100"
                    disabled={(quantity || 1) <= 1}
                    aria-label="Decrease quantity"
                >
                    -
                </button>

                <div className="flex h-10 w-12 items-center justify-center border-x border-gray-300">
                    <span className="text-gray-900">{quantity}</span>
                </div>

                <button
                    onClick={() =>
                        onUpdateQuantity?.(productId, (quantity || 1) + 1)
                    }
                    className="flex h-10 w-10 items-center justify-center text-gray-600 transition-colors hover:bg-gray-100"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default QuantitySelect;
