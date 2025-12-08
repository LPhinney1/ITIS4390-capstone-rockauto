import { Vehicle } from '@/app/components/vehicle-card';
import { Plus, Car, Check, Edit2, Trash2 } from 'lucide-react';
import AddVehicleButton from '@/app/ui_new/add-vehicle-button';
import VehicleFormSlot from '@/app/components/vehicle-form-slot';
export const MyCars: Vehicle[] = [];




export default function GaragePage() {
    return (
        <main className="flex-1">
            {/* Header */}
            <div className="mb-8 min-h-max">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4"></div>
                </div>


        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[32px] text-gray-900 mb-2">My Garage</h2>
            <p className="text-gray-600"> Manage your vehicles to find the perfect parts</p>
          </div>
                    <AddVehicleButton launchExternally />
                </div>
            </div>

            {/* Add/Edit Vehicle Form (rendered in slot below header) */}
            <VehicleFormSlot />


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
                        <div className="flex justify-center">
                            <AddVehicleButton launchExternally />
                        </div>
                    </div>
                ) : (
                    MyCars.map((vehicle) => (
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
                      // onClick={() => onSetDefault(vehicle.id)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Set as default"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    // onClick={() => handleEdit(vehicle)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit vehicle"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    // onClick={() => handleDelete(vehicle.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete vehicle"
                  >
                    <Trash2 className="w-5 h-5" />
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

      {MyCars.length > 0 && (
        <div className="mt-8 p-6 bg-[#f8f9fa] rounded-lg border border-gray-200">
          <h3 className="text-gray-900 mb-2">💡 Pro Tip</h3>
          <p className="text-gray-600">
            Your default vehicle is used to filter parts and ensure compatibility.
            You can switch between vehicles in your shopping cart.
          </p>
        </div>
      )}
    </main>
  );
}