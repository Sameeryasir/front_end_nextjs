import Link from 'next/link'
import React from 'react'
import { FiCalendar, FiUsers, FiScissors, FiShoppingBag, FiBox, FiBarChart2, FiPlusCircle } from 'react-icons/fi'; 

export default function Sidebar() {
  return (
    <div className="bg-gray-300 text-gray-900 w-full sm:w-64 h-full sm:h-auto fixed sm:relative shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Barber Shop</h2>
      </div>
      <nav className="mt-5">
        <ul>
          <li className="flex items-center p-4 hover:bg-gray-200 transition duration-200">
            <FiCalendar className="mr-2" />
            <Link href="/admin/mybookings">
              <p>Appointments</p>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 transition duration-200">
            <FiUsers className="mr-2" />
            <Link href="/admin/customer">
              <p>Customers</p>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 transition duration-200">
            <FiScissors className="mr-2" />
            <p>Services</p>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 transition duration-200">
            <FiShoppingBag className="mr-2" />
            <Link href='/admin/shop'>
              <p>Shops</p>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 transition duration-200">
            <FiPlusCircle className="mr-2" />
            <Link href='/admin/add-shop'>
              <p>Add New Shop</p>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 transition duration-200">
            <FiPlusCircle className="mr-2" />
            <Link href='/admin/add-employee'>
              <p>Add New Employee</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
