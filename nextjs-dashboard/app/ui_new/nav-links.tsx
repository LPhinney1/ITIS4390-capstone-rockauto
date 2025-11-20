import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';


import { ShoppingCart, User, GitCompare, Car } from 'lucide-react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const old_links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];


const links = [
  { href: 'dashboard/garage', icon: Car },
  { href: 'dashboard/compare', icon: GitCompare },
  { href: '/dashboard/cart', icon: ShoppingCart },
  { href: '/dashboard/profile', icon: User },
];


export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.href}
            href={link.href}
            aria-label={link.href}
            className="relative bg-[#5b5fc7] rounded-lg w-9 h-9 flex items-center justify-center hover:bg-[#4a4db5] transition-colors"
          >
            <LinkIcon className="w-5 h-5 text-white" />
          </a>
        );
      })}
    </>
  );
}



// <button
//   // onClick={onGarageClick}
//   className="relative bg-[#5b5fc7] rounded-lg size-9 flex items-center justify-center hover:bg-[#4a4db5] transition-colors"
//   title="My Garage"
// >
//   <Car className="w-5 h-5 text-white" />
//   {/* {vehicleCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-[#10b981] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
//                   {vehicleCount}
//                 </span>
//               )} */}
// </button>

// {/* Compare */ }
// <button
//   // onClick={onCompareClick}
//   className="relative bg-[#5b5fc7] rounded-lg size-9 flex items-center justify-center hover:bg-[#4a4db5] transition-colors"
//   title="Compare Products"
// >
//   <GitCompare className="w-5 h-5 text-white" />
//   {/* {compareCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-[#f59e0b] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
//                   {compareCount}
//                 </span>
//               )} */}
// </button>

// {/* Cart */ }
// <button
//   // onClick={onCartClick}
//   className="relative bg-[#5b5fc7] rounded-lg size-9 flex items-center justify-center hover:bg-[#4a4db5] transition-colors"
//   title="Shopping Cart"
// >
//   <ShoppingCart className="w-5 h-5 text-white" />
//   {/* {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
//                   {cartItemCount}
//                 </span>
//               )} */}
// </button>

// {/* User Profile with Dropdown */ }
// <div className="relative group">
//   <button
//     // onClick={onProfileClick}
//     className="bg-[#5b5fc7] rounded-full size-9 flex items-center justify-center hover:bg-[#4a4db5] transition-colors"
//     title="User Profile"
//   >
//     <User className="w-5 h-5 text-white" />
//   </button>

//   {/* Dropdown Menu */}
//   <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//     <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden min-w-[160px]">
//       <div className="py-1">
//         <button
//           // onClick={onLoginClick}
//           className="w-full text-left px-3 py-2 hover:bg-[#f3f4f6] transition-colors flex items-center gap-2"
//         >
//           <User className="w-4 h-4 text-gray-600" />
//           <span className="text-sm text-gray-900">Login</span>
//         </button>
//         <div className="h-px bg-gray-200 mx-2"></div>
//         <button
//           // onClick={onSignUpClick}
//           className="w-full text-left px-3 py-2 hover:bg-[#f3f4f6] transition-colors flex items-center gap-2"
//         >
//           <User className="w-4 h-4 text-gray-600" />
//           <span className="text-sm text-gray-900">Sign Up</span>
//         </button>
//       </div>
//     </div>
//   </div>
// </div>