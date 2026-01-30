// export const Navbar = () => {
//   return (
//     <div className="bg-white shadow">
//       <div className="max-w-7xl mx-auto">
//         <nav className="bg-blue-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="text-lg font-semibold">Inventory Management</div>
//             <ul className="flex space-x-4">
//               <li className="hover:bg-blue-500 rounded px-2 py-1 cursor-pointer">
//                 Home
//               </li>
//               <li className="hover:bg-blue-500 rounded px-2 py-1 cursor-pointer">
//                 Register
//               </li>
//               <li className="hover:bg-blue-500 rounded px-2 py-1 cursor-pointer">
//                 Login
//               </li>
//               <li className="hover:bg-blue-500 rounded px-2 py-1 cursor-pointer">
//                 About
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };
//
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-lg font-semibold">Inventory Management</div>

          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-3 py-2 rounded hover:bg-gray-100">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-3 py-2 rounded hover:bg-gray-100">
                  Register
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-3 py-2 rounded hover:bg-gray-100">
                  Login
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className="px-3 py-2 rounded hover:bg-gray-100">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};
