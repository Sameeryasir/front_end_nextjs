"use client";
import React, { useEffect, useState } from 'react'
import { fetchEmployees } from '../service/employee';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
export default function Employee() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchEmployees();
          setEmployees(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
 

    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-9">
    <div className="flex flex-wrap justify-center gap-4">
        {employees && employees.map((employee, index) => (
        <div key={index} className="flex flex-col items-center pb-10 w-64">
            {employee.publicURL && (
            <Image src={employee.publicURL} width={300} height={300} className="w-24 h-24 mb-3 rounded-full shadow-lg"/>
            )}
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{employee.Name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
            <div className="flex mt-4 md:mt-6">
            <Button className="p-3 px-6 border border-primary bg-white text-primary rounded-full w-full mt-2 cursor-pointer transition duration-300 ease-in-out hover:bg-primary hover:text-white">
    Book
    </Button>
            </div>
        </div>
        ))}
    </div>
    </div>





      );
      
}
