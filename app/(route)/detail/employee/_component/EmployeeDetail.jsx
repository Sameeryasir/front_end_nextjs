import React from 'react';
import { Button } from '@/components/ui/button';
import { NotebookPen, Clock, Home } from 'lucide-react';
import Image from 'next/image';

export default function EmployeeDetail({ employee }) {
  return (
    <>
      <div className="bg-white">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Employee Details</h1>
          </div>
        

        <main className="container mx-auto px-6 py-10">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/3">
                <div className="h-64 md:h-96 w-64 md:w-96 relative border border-gray-200 rounded-lg overflow-hidden">
                  {employee?.publicURL && (
                    <Image
                      src={employee.publicURL} // Replace with your image path
                      alt="Employee Image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  )}
                </div>
              </div>
              <div className="md:w-2/3 md:ml-6 mt-6 md:mt-0">
                <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">{employee.Name}</h2>
                <p className="text-gray-600 mt-2">Joined: {employee.HiredDate}</p>

                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-600 border-b border-gray-200 pb-2">Bio: {employee.Description}</h3>
                </div>

                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-800 border-b border-gray-200 pb-2">Skills:</h3>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>Excellent communication skills</li>
                    <li>Proven sales record</li>
                    <li>Customer relationship management</li>
                    <li>Team leadership</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-800 border-b border-gray-200 pb-2">Contact:</h3>
                  <p className="text-gray-600 mt-2">Email: {employee.Email}</p>
                  <p className="text-gray-600 mt-2">Phone: {employee.PhoneNo}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
