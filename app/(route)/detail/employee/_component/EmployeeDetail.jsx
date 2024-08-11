    import React from 'react';
import Image from 'next/image';

export default function EmployeeDetail({ employee }) {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">Employee Details</h1>
          <main className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="h-64 md:h-96 w-full relative border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                  {employee?.publicURL && (
                    <Image
                      src={employee.publicURL}
                      alt="Employee Image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  )}
                </div>
              </div>
              <div className="md:w-2/3 md:ml-8">
                <h2 className="text-3xl font-semibold text-gray-900 border-b border-gray-300 pb-2">{employee.Name}</h2>
                <p className="text-gray-700 mt-4"><strong>Joined:</strong> {employee.HiredDate}</p>
                <div className="mt-6">
                  <h3 className="text-xl font-medium text-gray-800 border-b border-gray-300 pb-2">Bio</h3>
                  <p className="text-gray-700 mt-2">{employee.Description}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-medium text-gray-800 border-b border-gray-300 pb-2">Skills</h3>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Excellent communication skills</li>
                    <li>Proven sales record</li>
                    <li>Customer relationship management</li>
                    <li>Team leadership</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-medium text-gray-800 border-b border-gray-300 pb-2">Contact</h3>
                  <p className="text-gray-700 mt-2"><strong>Email:</strong> {employee.Email}</p>
                  <p className="text-gray-700 mt-2"><strong>Phone:</strong> {employee.PhoneNo}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
