"use client";

import Link from "next/link";
import { useState } from "react";
import SideNav from '../ui_new/sidenav';

export default function AdvancedSearchPage() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [partType, setPartType] = useState("");
  const [price, setPrice] = useState(50);
  const [color, setColor] = useState<string | null>(null);

  const colors = [
    { id: "white", hex: "#FFFFFF" },
    { id: "black", hex: "#000000" },
    { id: "gray", hex: "#6B6B6B" },
    { id: "tan", hex: "#D2B48C" },
    { id: "brown", hex: "#4F340C" },
    { id: "blue", hex: "#0000FF" },
    { id: "green", hex: "#008000" },
    { id: "pink", hex: "#FFC0CB" },
    { id: "red", hex: "#FF0000" },
    { id: "orange", hex: "#FFA500" },
    { id: "yellow", hex: "#FFFF00" },
  ];

  function clearFilters() {
    setYear("");
    setMake("");
    setModel("");
    setTrim("");
    setPartType("");
    setColor(null);
    setPrice(50);
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-10 px-4 flex">
      <SideNav />

      {/* Main content */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden border border-[#D1D5DC]">

          {/* Header */}
          <div className="bg-[#6366F1] text-white py-6 text-center">
            <h1 className="text-2xl font-semibold">Advanced Search</h1>
          </div>

          {/* Form */}
          <div className="p-8 flex flex-col gap-6">

            {/* Year + Make */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#364153]">
                  Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border border-[#D1D5DC] rounded-md px-3 py-2 bg-white text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#364153]">
                  Make
                </label>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="border border-[#D1D5DC] rounded-md px-3 py-2 bg-white text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>
            </div>

            {/* Model + Trim */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#364153]">
                  Model
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="border border-[#D1D5DC] rounded-md px-3 py-2 bg-white text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#364153]">
                  Trim
                </label>
                <input
                  type="text"
                  value={trim}
                  onChange={(e) => setTrim(e.target.value)}
                  className="border border-[#D1D5DC] rounded-md px-3 py-2 bg-white text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>
            </div>

            {/* Part Type */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#364153]">
                Part Type
              </label>
              <input
                type="text"
                value={partType}
                onChange={(e) => setPartType(e.target.value)}
                className="border border-[#D1D5DC] rounded-md px-3 py-2 bg-white text-[#364153] focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>

            {/* Color */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#364153]">
                Color (for body parts)
              </label>

              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColor(c.id)}
                    className={`w-6 h-6 rounded border border-black ${
                      color === c.id && "ring-2 ring-offset-1 ring-[#6366F1]"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#364153]">Price</label>

              <div className="flex items-center gap-4">
                <span className="text-black">$</span>

                <input
                  type="range"
                  min={0}
                  max={200}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="flex-1"
                />

                <span className="text-black">$$$$$</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 mt-4">
              <button
                type="button"
                onClick={clearFilters}
                className="w-32 py-2 rounded-md bg-[#D1D5DC] text-white"
              >
                Clear Filters
              </button>

              {/* TODO: href value needs to be changed to whatever the search results page is called*/}
              <Link
                href="/"
                className="w-32 py-2 rounded-md bg-[#6366F1] text-center text-white hover:bg-[#5257d8]"
              >
                Search
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-4">
              <Link href="/home" className="text-sm text-[#364153] hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
