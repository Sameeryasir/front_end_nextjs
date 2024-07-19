import React from 'react'

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64">
    <div className="p-4">
      <h2 className="text-2xl font-bold">Barber Shop</h2>
    </div>
    <nav className="mt-5">
      <ul>
        <li className="p-4">
            <a href="/admin/mybookings">Appointments</a>
        
        </li>
        <li className="p-4">
            <a href="/admin/customer">Customers</a>
        </li>
        <li className="p-4">
            <a>Services</a>
        </li>
        <li className="p-4">
            <a href='/admin/shop'>Shops</a>
       i </li>
        <li className="p-4">
            <a>Inventory</a>
        </li>
        <li className="p-4">
            <a>Reports</a>
        </li>
      </ul>
    </nav>
  </div>
  )
}

