import type React from "react";

const AddedToCartToast: React.FC<{ productName?: string }> = ({ productName }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">
        {productName ? `${productName} added to cart` : 'Added to cart'}
      </span>
    </div>
  );
}

const AddedVehicleToast: React.FC<{ vehicleName?: string }> = ({ vehicleName }) => {
  return (
    <div className="flex items-center gap-2">
        <span className="font-medium">
            {vehicleName ? `${vehicleName} added to garage` : 'Added to garage'}
        </span>
    </div>
  );
}

export function renderToast<T extends Record<string, unknown> = {}>(
    ToastComponent: React.ComponentType<T>,
    props?: T
) {
    return <ToastComponent {...(props as T)} />;
}