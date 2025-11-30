"use client";
import React, { useState, useEffect } from "react";
import { Filter, Zap, Droplet, Lightbulb, Wrench, Gauge, Wind } from "lucide-react";

const categories = [
  { id: 1, name: "Engine Parts", icon: Wrench },
  { id: 2, name: "Electrical", icon: Zap },
  { id: 3, name: "Brakes", icon: Gauge },
  { id: 4, name: "Fluids & Oils", icon: Droplet },
  { id: 5, name: "Lighting", icon: Lightbulb },
  { id: 6, name: "Climate Control", icon: Wind },
];

interface CategorySidebarProps {
  onCategorySelect?: (categoryName: string | null) => void;
  selectedCategory?: string | null;
}

export default function CategorySidebar({ onCategorySelect, selectedCategory: selectedProp }: CategorySidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(selectedProp ?? null);

  // keep internal state in sync if parent controls the selected category
  useEffect(() => {
    if (selectedProp !== undefined) setSelectedCategory(selectedProp ?? null);
  }, [selectedProp]);

  function handleCategorySelect(categoryName: string) {
    const next = selectedCategory === categoryName ? null : categoryName;
    setSelectedCategory(next);
    onCategorySelect?.(next);
  }

  return (
    <aside className="w-[60px] bg-white border-r border-gray-200 py-4 pr-5">
      <div className="flex flex-col gap-y-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = (selectedCategory ?? null) === category.name;

          return (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.name)}
              className={`bg-white rounded-lg w-12 h-12 border-2 shadow-sm flex items-center justify-center transition-all ${
                isSelected
                  ? "border-[#6366f1] bg-[#6366f1] text-white"
                  : "border-gray-200 text-gray-700 hover:border-[#6366f1] hover:text-[#6366f1]"
              }`}
              title={category.name}
              aria-pressed={isSelected}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
