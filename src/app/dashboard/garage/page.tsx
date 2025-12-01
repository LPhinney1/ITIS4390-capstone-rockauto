import { Vehicle } from "@/app/components/vehicle-card";
import { ContinueShoppingButton } from "@/app/ui_new/button";
import { Plus, Car, Check, Edit2, Trash2 } from "lucide-react";
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
  let myCar: Vehicle = {
    id: MyCars.length + 1,
    year: "2020",
    make: "Honda",
    model: "Civic",
    engine: "2.0L I4",
    nickname: "My Civic",
    // isDefault: true,
    // name: "2020 Honda Civic",
  };
  MyCars.push(myCar);
};


export default function Page() {
  return (
    <main className="flex-1">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
          </div>
        </div>

        <div className="h-[3px] bg-[#6366f1] mb-6 rounded-full" style={{ width: '120px' }} />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[32px] text-gray-900 mb-2">My Garage</h2>
            <p className="text-gray-600"> Manage your vehicles to find the perfect parts</p>
          </div>

          {/* {!showForm && ( */}
            <button
              // onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-[#6366f1] text-white px-6 py-3 rounded-lg hover:bg-[#4f46e5] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Vehicle
            </button>
          {/* )} */}
        </div>
      </div>

      {/* Add/Edit Vehicle Form */}
      

      {/* Vehicle List */}
      <div className="grid grid-cols-1 gap-6">
        {MyCars.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No vehicles in your garage</h3>
            <p className="text-gray-600 mb-6">
              Add your first vehicle to get personalized part recommendations
            </p>
            <button
              // onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-[#6366f1] text-white px-6 py-3 rounded-lg hover:bg-[#4f46e5] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Vehicle
            </button>
          </div>
        ) : (
          MyCars.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-all ${vehicle.isDefault ? 'border-[#6366f1]' : 'border-gray-200'
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#eef2ff] rounded-lg flex items-center justify-center">
                    <Car className="w-8 h-8 text-[#6366f1]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[20px] text-gray-900">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      {vehicle.isDefault && (
                        <span className="bg-[#6366f1] text-white text-sm px-3 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    {vehicle.nickname && (
                      <p className="text-gray-600 mb-2">{vehicle.nickname}</p>
                    )}
                    <p className="text-gray-500">
                      <span className="inline-block mr-4">Engine: {vehicle.engine}</span>
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
                <div className="mt-4 p-3 bg-[#eef2ff] rounded-lg">
                  <p className="text-sm text-[#4338ca]">
                    Parts in your cart are being filtered for this vehicle
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