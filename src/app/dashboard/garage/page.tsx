import { Vehicle } from '@/app/components/vehicle-card';
import { ContinueShoppingButton } from '@/app/ui_new/button';
import { Plus, Car, Check, Edit2, Trash2 } from 'lucide-react';
export const MyCars: Vehicle[] = [];

//function to make vehicle to add to garage
export function addVehicleToGarage(vehicle: Vehicle) {
    //check if there is a default car
    //   if (MyCars.length === 0) {
    //     vehicle.isDefault = true;
    //   } else {
    //  HERE
    //  prompt user. if they say yes, change id to and increment all other id by 1. if no, just add to end of list

    //   }
    MyCars.push(vehicle);
}

export function addRandomVehicleToGarage() {
    const myCar: Vehicle = {
        id: MyCars.length + 1,
        year: '2020',
        make: 'Honda',
        model: 'Civic',
        engine: '2.0L I4',
        nickname: 'My Civic',
        // isDefault: true,
        // name: "2020 Honda Civic",
    };
    MyCars.push(myCar);
}

export default function Page() {
    return (
        <main className="flex-1">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4"></div>
                </div>

                <div
                    className="mb-6 h-[3px] rounded-full bg-[#6366f1]"
                    style={{ width: '120px' }}
                />

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="mb-2 text-[32px] text-gray-900">
                            My Garage
                        </h2>
                        <p className="text-gray-600">
                            {' '}
                            Manage your vehicles to find the perfect parts
                        </p>
                    </div>

                    {/* {!showForm && ( */}
                    <button
                        // onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 rounded-lg bg-[#6366f1] px-6 py-3 text-white transition-colors hover:bg-[#4f46e5]"
                    >
                        <Plus className="h-5 w-5" />
                        Add Vehicle
                    </button>
                    {/* )} */}
                </div>
            </div>

            {/* Add/Edit Vehicle Form */}

            {/* Vehicle List */}
            <div className="grid grid-cols-1 gap-6">
                {MyCars.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
                        <Car className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                        <h3 className="mb-2 text-gray-900">
                            No vehicles in your garage
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Add your first vehicle to get personalized part
                            recommendations
                        </p>
                        <button
                            // onClick={() => setShowForm(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#6366f1] px-6 py-3 text-white transition-colors hover:bg-[#4f46e5]"
                        >
                            <Plus className="h-5 w-5" />
                            Add Your First Vehicle
                        </button>
                    </div>
                ) : (
                    MyCars.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            className={`rounded-lg border-2 bg-white p-6 transition-all hover:shadow-lg ${
                                vehicle.isDefault
                                    ? 'border-[#6366f1]'
                                    : 'border-gray-200'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#eef2ff]">
                                        <Car className="h-8 w-8 text-[#6366f1]" />
                                    </div>

                                    <div>
                                        <div className="mb-1 flex items-center gap-2">
                                            <h3 className="text-[20px] text-gray-900">
                                                {vehicle.year} {vehicle.make}{' '}
                                                {vehicle.model}
                                            </h3>
                                            {vehicle.isDefault && (
                                                <span className="rounded-full bg-[#6366f1] px-3 py-1 text-sm text-white">
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
                                            // onClick={() => onSetDefault(vehicle.id)}
                                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                                            title="Set as default"
                                        >
                                            <Check className="h-5 w-5" />
                                        </button>
                                    )}
                                    <button
                                        // onClick={() => handleEdit(vehicle)}
                                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                                        title="Edit vehicle"
                                    >
                                        <Edit2 className="h-5 w-5" />
                                    </button>
                                    <button
                                        // onClick={() => handleDelete(vehicle.id)}
                                        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                                        title="Delete vehicle"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {vehicle.isDefault && (
                                <div className="mt-4 rounded-lg bg-[#eef2ff] p-3">
                                    <p className="text-sm text-[#4338ca]">
                                        Parts in your cart are being filtered
                                        for this vehicle
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {MyCars.length > 0 && (
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
