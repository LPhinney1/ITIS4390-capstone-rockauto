'use client';
import React, { useEffect, useState } from 'react';
import VehicleForm, { Vehicle } from './vehicle-form';
import UserVehicleCard from './vehicle-card';

export default function VehicleFormSlot() {
    const [open, setOpen] = useState(false);
    const [initial, setInitial] = useState<Partial<Vehicle> | undefined>(
        undefined,
    );

    useEffect(() => {
        function onOpen(e: Event) {
            const ev = e as CustomEvent;
            setInitial(ev.detail ?? undefined);
            setOpen(true);
            // scroll into view if needed
            setTimeout(() => {
                const el = document.getElementById('vehicle-form-slot');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }

        function onClose() {
            setOpen(false);
            setInitial(undefined);
        }

        window.addEventListener('vehicle:open-form', onOpen as EventListener);
        window.addEventListener('vehicle:close-form', onClose as EventListener);

        return () => {
            window.removeEventListener(
                'vehicle:open-form',
                onOpen as EventListener,
            );
            window.removeEventListener(
                'vehicle:close-form',
                onClose as EventListener,
            );
        };
    }, []);

    function handleSubmit(v: Vehicle) {
        // dispatch added event so other components can react
        try {
            window.dispatchEvent(
                new CustomEvent('vehicle:added', { detail: v }),
            );
        } catch (e) {
            // ignore
        }
        setOpen(false);
    }

    return (
        <div id="vehicle-form-slot" className="w-full bg-red-500">
            {open && (
                <VehicleForm
                    initial={initial}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setOpen(false);
                        try {
                            window.dispatchEvent(
                                new CustomEvent('vehicle:close-form'),
                            );
                        } catch (e) {}
                    }}
                />
            )}
        </div>
    );
}
