"use client";
import { Filter, Zap, Droplet, Lightbulb, Wrench, Gauge, Wind } from 'lucide-react';

const categories = [
  { id: 1, name: 'Engine Parts', icon: Wrench },
  { id: 2, name: 'Electrical', icon: Zap },
  { id: 3, name: 'Brakes', icon: Gauge },
  { id: 4, name: 'Fluids & Oils', icon: Droplet },
  { id: 5, name: 'Lighting', icon: Lightbulb },
  { id: 6, name: 'Climate Control', icon: Wind },
];

interface CategorySidebarProps {
  onCategorySelect: (categoryName: string) => void;
  selectedCategory: string | null;
}

// Simple left sidebar wrapper used across the app
export default function SideNav() {
  return (
    <div className="bg-red-400 flex-2 max-w-3 h-full flex-col">
      <p>SideNav</p>
    </div>
  );
}

// The original, more complete CategorySidebar UI is available below if needed.
// export function CategorySidebar({ onCategorySelect, selectedCategory }: CategorySidebarProps) {
//   return (
//     <aside className="w-[80px] bg-white border-r border-gray-200 py-4 px-3">
//       <div className="flex flex-col gap-4">
//         {categories.map((category) => {
//           const Icon = category.icon;
//           const isSelected = selectedCategory === category.name;
//
//           return (
//             <button
//               key={category.id}
//               onClick={() => onCategorySelect(category.name)}
//               className={`bg-white rounded-lg w-12 h-12 border-2 shadow-sm flex items-center justify-center transition-all ${
//                 isSelected
//                   ? 'border-[#6366f1] bg-[#6366f1] text-white'
//                   : 'border-gray-200 text-gray-700 hover:border-[#6366f1] hover:text-[#6366f1]'
//               }`}
//               title={category.name}
//             >
//               <Icon className="w-5 h-5" />
//             </button>
//           );
//         })}
//       </div>
//     </aside>
//   );
// }
