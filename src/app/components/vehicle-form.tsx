"use client";
import React, { useState } from "react";
import { MyCars } from "../dashboard/garage/page";

export type Vehicle = {
  id?: number;
  year: string;
  make: string;
  model: string;
  engine: string;
  nickname?: string;
  isDefault?: boolean;
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

const makes = [
  "Acura",
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lexus",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Ram",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];
//HERE: works but doesn't render anything
function addVehicleToGarage(vehicle: Vehicle) {
  const newVehicle = {
    id: MyCars.length + 1,
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
    engine: vehicle.engine,
    nickname: vehicle.nickname,
  };
  MyCars.push(newVehicle);
  console.log("Vehicle added to garage:", newVehicle);
}

const engines = [
  "1.5L 4-Cylinder",
  "2.0L 4-Cylinder",
  "2.5L 4-Cylinder",
  "3.0L V6",
  "3.5L V6",
  "3.6L V6",
  "5.0L V8",
  "5.7L V8",
  "6.2L V8",
  "Electric",
  "Hybrid",
];

interface Props {
  onSubmit: (vehicle: Vehicle) => void;
  onCancel?: () => void;
  initial?: Partial<Vehicle>;
  // optional list of model suggestions; when provided, the model input will show suggestions but still accept free text
  modelOptions?: string[];
}

export default function VehicleForm({ onSubmit, onCancel, initial, modelOptions }: Props) {
  const [formData, setFormData] = useState<Vehicle>({
    year: initial?.year ?? "",
    make: initial?.make ?? "",
    model: initial?.model ?? "",
    engine: initial?.engine ?? "",
    nickname: initial?.nickname ?? "",
  } as Vehicle);

  function handleChange<K extends keyof Vehicle>(key: K, value: Vehicle[K]) {
    setFormData((s) => ({ ...s, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.year || !formData.make || !formData.model || !formData.engine) {
      // minimal client-side validation
      alert("Please fill in year, make, model and engine");
      return;
    }
    addVehicleToGarage(formData);
    // reset form after submit
    setFormData({ year: "", make: "", model: "", engine: "", nickname: "" });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-md">
      <h2 className="text-[24px] text-gray-900 mb-6">{initial?.id ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <select
              value={formData.year}
              onChange={(e) => handleChange("year", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6366f1]"
              required
            >
              <option value="">Select year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Make</label>
            <select
              value={formData.make}
              onChange={(e) => handleChange("make", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6366f1]"
              required
            >
              <option value="">Select make</option>
              {makes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            {modelOptions && modelOptions.length > 0 ? (
              <>
                <input
                  list="model-options"
                  value={formData.model}
                  onChange={(e) => handleChange("model", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6366f1]"
                  placeholder="e.g., Camry, Civic"
                  required
                />
                <datalist id="model-options">
                  {modelOptions.map((m) => (
                    <option key={m} value={m} />
                  ))}
                </datalist>
              </>
            ) : (
              <input
                value={formData.model}
                onChange={(e) => handleChange("model", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6366f1]"
                placeholder="e.g., Camry, Civic"
                required
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Engine</label>
            <select
              value={formData.engine}
              onChange={(e) => handleChange("engine", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6366f1]"
              required
            >
              <option value="">Select engine</option>
              {engines.map((eng) => (
                <option key={eng} value={eng}>
                  {eng}
                </option>
              ))}
            </select>
          </div>
        </div>

          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nickname (optional)</label>
          <input
            value={formData.nickname}
            onChange={(e) => handleChange("nickname", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6366f1]"
            placeholder="e.g., My Daily Driver"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => {
                const test: Vehicle = {
                  year: '2020',
                  make: 'Honda',
                  model: 'Civic',
                  engine: '2.0L I4',
                  nickname: 'My Civic',
                };
                setFormData(test);
                // small delay so the autofill is visible before submit
                // HERE: change to submit button later
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
            >
              Use Test Data
            </button>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onCancel?.()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#4f46e5] transition-colors">
              Add Vehicle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
