"use client";
import { fetchAppointements } from "@/app/service/appointement";
import { useState, useEffect } from "react";

export default function Bookings({ appointements }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">User Records</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {appointements &&
              appointements.map((record) => (
                <tr key={record.AppointementId}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {record.Price}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {record.ShopId}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {record.Date}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {record.role}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
