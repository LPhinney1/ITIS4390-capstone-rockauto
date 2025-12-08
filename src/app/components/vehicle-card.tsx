import { AlertCircle, Car, ChevronDown } from 'lucide-react';
import { CartItem } from '../dashboard/cart/cartItems';
export interface Vehicle {
    id: number;
    year: string;
    make: string;
    model: string;
    engine: string;
    nickname?: string;
    isDefault?: boolean;
    name?: string; // default will be `${year} ${make} ${year}`
    cartList?: CartItem[]; // list of product IDs associated with this vehicle
}

// HERE: fix switch vehicle functionality
//       base the card off of garage functionality
export default function VehicleCard() {
    const selectedVehicle: Vehicle = {
        id: 1,
        year: '2020',
        make: 'Honda',
        model: 'Civic',
        engine: '2.0L I4',
        nickname: 'My Civic',
        isDefault: true,
        name: '2020 Honda Civic',
    };

    return (
        // {!selectedVehicle && vehicles.length > 0 && (
        <div className="mb-8 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] p-6 shadow-lg">
            <div className="flex items-center gap-6">
                {/* Vehicle Image */}
                <div className="h-32 w-48 shrink-0 overflow-hidden rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm">
                    <img
                        src="https://images.unsplash.com/photo-1686074449582-6374eaebacf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljJTIwY2FyfGVufDF8fHx8MTc2MTQyMTQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt={`${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Vehicle Details */}
                <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                        <Car className="h-5 w-5 text-white/80" />
                        <span className="text-sm text-white/80">
                            Ordering for
                        </span>
                    </div>
                    <h3 className="mb-1 text-[28px] text-white">
                        {selectedVehicle.year} {selectedVehicle.make}{' '}
                        {selectedVehicle.model}
                    </h3>
                    <p className="mb-3 text-white/90">
                        {selectedVehicle.engine}
                    </p>
                    {selectedVehicle.nickname && (
                        <p className="mb-3 text-sm italic text-white/80">
                            "{selectedVehicle.nickname}"
                        </p>
                    )}

                    
                </div>
            </div>
        </div>
    );
}
export function UserVehicleCard(selectedVehicle: Vehicle) {


    return (
        // {!selectedVehicle && vehicles.length > 0 && (
        <div className="mb-8 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] p-6 shadow-lg">
            <div className="flex items-center gap-6">
                {/* Vehicle Image */}
                <div className="h-32 w-48 shrink-0 overflow-hidden rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm">
                    <img
                        src="https://images.unsplash.com/photo-1686074449582-6374eaebacf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljJTIwY2FyfGVufDF8fHx8MTc2MTQyMTQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt={`${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Vehicle Details */}
                <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                        <Car className="h-5 w-5 text-white/80" />
                        <span className="text-sm text-white/80">
                            Ordering for
                        </span>
                    </div>
                    <h3 className="mb-1 text-[28px] text-white">
                        {selectedVehicle.year} {selectedVehicle.make}{' '}
                        {selectedVehicle.model}
                    </h3>
                    <p className="mb-3 text-white/90">
                        {selectedVehicle.engine}
                    </p>
                    {selectedVehicle.nickname && (
                        <p className="mb-3 text-sm italic text-white/80">
                            "{selectedVehicle.nickname}"
                        </p>
                    )}

                    
                </div>
            </div>
        </div>
    );
}