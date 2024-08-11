"use client";
import React from "react";

const CustomerList = ({ app }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Customer List
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-left text-gray-800 font-semibold uppercase tracking-wider border-b border-gray-300">
                Full Name
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-gray-800 font-semibold uppercase tracking-wider border-b border-gray-300">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {app?.map((booking, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              >
                <td className="py-4 px-6 border-b border-gray-200">
                  {booking?.customer?.FullName}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {booking?.customer?.Email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
