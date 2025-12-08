'use client';
import { useState, useEffect } from 'react';
import { Vehicle } from '@/app/components/vehicle-card';
import { Car, Check, Edit2, Trash2 } from 'lucide-react';
import AddVehicleButton from '@/app/ui_new/add-vehicle-button';
import VehicleFormSlot from '@/app/components/vehicle-form-slot';

export default function GaragePage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    // Listen for vehicle:added event
    useEffect(() => {
        function handleVehicleAdded(e: Event) {
            const ev = e as CustomEvent<Vehicle>;
            const newVehicle = ev.detail;

            setVehicles((prevVehicles) => {
                // If this is the first vehicle, make it default
                const vehicleToAdd = {
                    ...newVehicle,
                    id: newVehicle.id || Date.now(),
                    isDefault: prevVehicles.length === 0,
                };

                // Check if we're updating an existing vehicle
                const existingIndex = prevVehicles.findIndex(
                    (v) => v.id === vehicleToAdd.id,
                );
                if (existingIndex >= 0) {
                    // Update existing
                    const updated = [...prevVehicles];
                    updated[existingIndex] = vehicleToAdd;
                    return updated;
                } else {
                    // Add new
                    return [...prevVehicles, vehicleToAdd];
                }
            });
        }

        window.addEventListener(
            'vehicle:added',
            handleVehicleAdded as EventListener,
        );

        return () => {
            window.removeEventListener(
                'vehicle:added',
                handleVehicleAdded as EventListener,
            );
        };
    }, []);

    // Set a vehicle as default
    const handleSetDefault = (vehicleId: number) => {
        setVehicles(
            vehicles.map((v) => ({
                ...v,
                isDefault: v.id === vehicleId,
            })),
        );
    };

    // Delete a vehicle
    const handleDelete = (vehicleId: number) => {
        const deletedVehicle = vehicles.find((v) => v.id === vehicleId);
        const filteredVehicles = vehicles.filter((v) => v.id !== vehicleId);

        if (deletedVehicle?.isDefault && filteredVehicles.length > 0) {
            filteredVehicles[0] = { ...filteredVehicles[0], isDefault: true };
        }

        setVehicles(filteredVehicles);
    };

    // Start editing a vehicle
    const handleEdit = (vehicle: Vehicle) => {
        // Dispatch event to open form with vehicle data
        window.dispatchEvent(
            new CustomEvent('vehicle:open-form', { detail: vehicle }),
        );
    };

    return (
        <main className="flex-1">
            {/* Header */}
            <div className="mb-8 min-h-max">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4"></div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="mb-2 text-[32px] text-gray-900">
                            My Garage
                        </h2>
                        <p className="text-gray-600">
                            Manage your vehicles to find the perfect parts
                        </p>
                    </div>
                    <AddVehicleButton launchExternally />
                </div>
            </div>

            {/* Add/Edit Vehicle Form (rendered in slot below header) */}
            <VehicleFormSlot />

            {/* Vehicle List */}
            <div className="grid grid-cols-1 gap-6">
                {vehicles.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
                        <Car className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                        <h3 className="mb-2 text-gray-900">
                            No vehicles in your garage
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Add your first vehicle to get personalized part
                            recommendations
                        </p>
                        <div className="flex justify-center">
                            <AddVehicleButton launchExternally />
                        </div>
                    </div>
                ) : (
                    vehicles.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            className={`rounded-lg border-2 bg-white p-6 transition-all hover:shadow-lg ${
                                vehicle.isDefault
                                    ? 'border-primary'
                                    : 'border-gray-200'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#eef2ff]">
                                        <Car className="h-8 w-8 text-primary" />
                                    </div>

                                    <div>
                                        <div className="mb-1 flex items-center gap-2">
                                            <h3 className="text-[20px] text-gray-900">
                                                {vehicle.year} {vehicle.make}{' '}
                                                {vehicle.model}
                                            </h3>
                                            {vehicle.isDefault && (
                                                <span className="rounded-full bg-primary px-3 py-1 text-sm text-white">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        {vehicle.nickname && (
                                            <p className="mb-2 text-gray-600">
                                                {vehicle.nickname}
                                            </p>
                                        )}
                                        <p className="text-gray-500">
                                            <span className="mr-4 inline-block">
                                                Engine: {vehicle.engine}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {!vehicle.isDefault && (
                                        <button
                                            onClick={() =>
                                                handleSetDefault(vehicle.id)
                                            }
                                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                                            title="Set as default"
                                        >
                                            <Check className="h-5 w-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleEdit(vehicle)}
                                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                                        title="Edit vehicle"
                                    >
                                        <Edit2 className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vehicle.id)}
                                        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                                        title="Delete vehicle"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {vehicle.isDefault && (
                                <div className="mt-4 rounded-lg bg-[#eef2ff] p-3">
                                    <p className="text-sm text-primary-700">
                                        Parts in your cart are being filtered
                                        for this vehicle
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {vehicles.length > 0 && (
                <div className="mt-8 rounded-lg border border-gray-200 bg-[#f8f9fa] p-6">
                    <h3 className="mb-2 text-gray-900">💡 Pro Tip</h3>
                    <p className="text-gray-600">
                        Your default vehicle is used to filter parts and ensure
                        compatibility. You can switch between vehicles in your
                        shopping cart.
                    </p>
                </div>
            )}
        </main>
    );
}
