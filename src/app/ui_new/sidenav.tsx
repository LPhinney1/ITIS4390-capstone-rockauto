"use client";
import React from "react";
import { Filter, Zap, Droplet, Lightbulb, Wrench, Gauge, Wind } from "lucide-react";

interface CategorySidebarProps {
  categories: { id: number; name: string }[];
  selectedCategory: number | null;
  onCategorySelect: (id: number | null) => void;
}

const iconById: Record<number, React.ElementType> = {
  1: Wrench,
  2: Droplet,
  3: Wind,
  4: Zap,
  5: Gauge,
};

function getIcon(id: number) {
  return iconById[id] ?? Filter;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategorySidebarProps) {

  return (
    <aside className="w-[60px] bg-white border-r border-gray-200 py-4 pr-5">
      <div className="flex flex-col gap-y-4">
        {categories.map((category) => {
          const Icon = getIcon(category.id);
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(isSelected ? null : category.id)}
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