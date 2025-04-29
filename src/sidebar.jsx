// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="font-sans">
//       <button
//         onClick={toggleSidebar}
//         className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-200 md:hidden"
//       >
//         {isOpen ? "✖" : "☰"}
//       </button>

//       <div
//         className={`fixed top-0 left-0 h-full bg-indigo-600 text-white w-64 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:static md:h-auto md:bg-transparent md:w-auto md:flex md:items-center md:space-x-6 z-40`}
//       >
//         <div className="p-6 md:p-0">
//           <h2 className="text-2xl font-bold mb-8 md:hidden">Menu</h2>
//           <ul className="space-y-4 md:space-y-0 md:flex md:space-x-6">
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `block text-lg font-semibold ${isActive ? "text-indigo-200" : "hover:text-indigo-200"}`
//                 }
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/about"
//                 className={({ isActive }) =>
//                   `block text-lg font-semibold ${isActive ? "text-indigo-200" : "hover:text-indigo-200"}`
//                 }
//               >
//                 About
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/services"
//                 className={({ isActive }) =>
//                   `block text-lg font-semibold ${isActive ? "text-indigo-200" : "hover:text-indigo-200"}`
//                 }
//               >
//                 Services
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/contact"
//                 className={({ isActive }) =>
//                   `block text-lg font-semibold ${isActive ? "text-indigo-200" : "hover:text-indigo-200"}`
//                 }
//               >
//                 Contact
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </div>
//   );
// }





import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="font-sans w-full flex justify-center">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-200 md:hidden"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-indigo-600 text-white w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-auto md:bg-indigo-600 md:w-full md:flex md:justify-center md:items-center z-40 md:rounded-xl md:shadow-md md:mb-6`}
      >
        <div className="p-6 md:p-4">
          <h2 className="text-2xl font-bold mb-8 md:hidden">Menu</h2>
          <ul className="space-y-4 md:space-y-0 md:flex md:space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block text-lg font-semibold text-yellow-200 ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block text-lg font-semibold text-yellow-200 ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block text-lg font-semibold text-yellow-200 ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block text-lg font-semibold text-yellow-200 ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}