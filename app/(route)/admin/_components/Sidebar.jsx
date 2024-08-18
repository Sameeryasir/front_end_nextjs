import Link from "next/link";
import React from "react";
import {
  FiCalendar,
  FiUsers,
  FiScissors,
  FiShoppingBag,
  FiPlusCircle,
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-gray-200 w-full sm:w-64 h-full sm:h-auto fixed sm:relative shadow-2xl">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white">Barber Shop</h2>
      </div>
      <nav className="mt-5">
        <ul>
        
          <li className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FiUsers className="mr-3 text-xl" />
            <Link href="/admin/customer">
              <p className="text-lg">Customers</p>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FiScissors className="mr-3 text-xl" />
            <p className="text-lg">Services</p>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FiShoppingBag className="mr-3 text-xl" />
            <Link href="/admin/shop">
              <p className="text-lg">Shops</p>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FiPlusCircle className="mr-3 text-xl" />
            <Link href="/admin/add-shop">
              <p className="text-lg">Add New Shop</p>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FiPlusCircle className="mr-3 text-xl" />
            <Link href="/admin/add-employee">
              <p className="text-lg">Add New Employee</p>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
            <FiPlusCircle className="mr-3 text-xl" />
            <Link href="/admin/add-inventory">
              <p className="text-lg">Add New Inventory</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
