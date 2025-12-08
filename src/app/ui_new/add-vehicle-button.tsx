'use client';
import React, { useState } from 'react';
import VehicleForm, { Vehicle } from '../components/vehicle-form';
import { Plus } from 'lucide-react';

interface Props {
    // optional callback if a parent page is client and wants to receive the new vehicle
    onAdd?: (vehicle: Vehicle) => void;
    // if true, the button will dispatch a window event to open a form rendered elsewhere (a "slot")
    launchExternally?: boolean;
}

export default function AddVehicleButton({ onAdd, launchExternally }: Props) {
    const [open, setOpen] = useState(false);
    const [added, setAdded] = useState<Vehicle[]>([]);

    function handleAdd(vehicle: Vehicle) {
        // assign a temporary id for client-side list
        const v = { ...vehicle, id: Date.now() };
        setAdded((s) => [v, ...s]);
        setOpen(false);
        onAdd?.(v);

        // also emit a browser event so other client scripts can listen
        try {
            window.dispatchEvent(
                new CustomEvent('vehicle:added', { detail: v }),
            );
        } catch (e) {
            // ignore on SSR or non-browser
        }
    }

    function handleClick() {
        if (launchExternally) {
            try {
                window.dispatchEvent(
                    new CustomEvent('vehicle:open-form', { detail: {} }),
                );
            } catch (e) {
                console.warn('Unable to dispatch vehicle:open-form event', e);
            }
            return;
        }

        setOpen((s) => !s);
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-2">
                <button
                    type="button"
                    onClick={handleClick}
                    className="relative flex inline-flex items-center justify-center gap-2 rounded-lg bg-[#5b5fc7] px-6 py-3 text-white transition-colors hover:bg-[#4a4db5]"
                >
                    <Plus className="h-5 w-5" />
                    {open ? 'Close' : 'Add Vehicle'}
                </button>
            </div>

            {open && (
                <VehicleForm
                    onSubmit={handleAdd}
                    onCancel={() => setOpen(false)}
                />
            )}

            {added.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-3">
                    {added.map((v) => (
                        <div
                            key={v.id}
                            className="rounded-lg border border-gray-200 bg-white p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">
                                        {v.year} {v.make} {v.model}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {v.engine}{' '}
                                        {v.nickname ? `• ${v.nickname}` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
