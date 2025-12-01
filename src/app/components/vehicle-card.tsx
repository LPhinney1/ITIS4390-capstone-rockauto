import { AlertCircle, Car, ChevronDown } from "lucide-react";

export interface Vehicle {
    id: number;
    year: string;
    make: string;
    model: string;
    engine: string;
    nickname?: string;
    isDefault?: boolean;
}


// HERE: fix switch vehicle functionality
//       base the card off of garage functionality
export default function VehicleCard() {
    const selectedVehicle: Vehicle = {
        id: 1,
        year: "2020",
        make: "Honda",
        model: "Civic",
        engine: "2.0L I4",
        nickname: "My Civic",
        isDefault: true,
    };

    const vehicles: Vehicle[] = [
        selectedVehicle];
    return (
        // {!selectedVehicle && vehicles.length > 0 && (
            <div className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl p-6 mb-8 shadow-lg">
                <div className="flex items-center gap-6">
                    {/* Vehicle Image */}
                    <div className="w-48 h-32 bg-white/10 rounded-lg overflow-hidden border-2 border-white/20 backdrop-blur-sm shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1686074449582-6374eaebacf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljJTIwY2FyfGVufDF8fHx8MTc2MTQyMTQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt={`${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Vehicle Details */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Car className="w-5 h-5 text-white/80" />
                            <span className="text-sm text-white/80">Ordering for</span>
                        </div>
                        <h3 className="text-[28px] text-white mb-1">
                            {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                        </h3>
                        <p className="text-white/90 mb-3">
                            {selectedVehicle.engine}
                        </p>
                        {selectedVehicle.nickname && (
                            <p className="text-sm text-white/80 italic mb-3">"{selectedVehicle.nickname}"</p>
                        )}

                        {/* Switch Vehicle Button */}
                        {vehicles.length > 0 && (
                            <div className="relative inline-block">
                                <button
                                    //   onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg transition-all border border-white/30"
                                >
                                    <Car className="w-4 h-4" />
                                    <span>Switch Vehicle</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform`} />
                                </button>

                                {/* {showVehicleDropdown && ( */}
                                <div className="absolute top-full left-0 mt-2 w-[320px] bg-white rounded-lg border border-gray-200 shadow-2xl z-50 max-h-[300px] overflow-y-auto">
                                    {vehicles.filter(v => v.id !== selectedVehicle.id).map((vehicle) => (
                                        <button
                                            key={vehicle.id}
                                            // onClick={() => { onSelectVehicle(vehicle.id); setShowVehicleDropdown(false);}}
                                            className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                                        >
                                            <p className="text-gray-900 group-hover:text-[#6366f1] transition-colors mb-1">
                                                {vehicle.year} {vehicle.make} {vehicle.model}
                                            </p>
                                            <p className="text-sm text-gray-600">{vehicle.engine}</p>
                                            {vehicle.nickname && (
                                                <p className="text-xs text-[#6366f1] mt-1">"{vehicle.nickname}"</p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

    );
}

