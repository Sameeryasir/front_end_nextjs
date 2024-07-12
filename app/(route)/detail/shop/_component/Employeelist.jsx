import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NotebookPen } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Employeelist({ shop }) {
  if (!shop) {
    console.error("Shop data is not available");
    return null;
  }

  if (!shop.employees || shop.employees.length === 0) {
    console.error("No employees found in the shop data");
    return null;
  }

  return (
    <div className='md:pl-10 ml-5'>
      <div className='hidden md:block border-gray-300 border'>
        <h2 className='font-bold text-lg mt-5 mb-3' style={{ padding: "0px 40px"}}>
          Related Employees
          </h2>
        <div style={{ padding: "10px 40px"}}>
          {shop.employees.map((employee, index) => (
            <Link
              key={employee.id} // Use employee.id as the key if available
              href={"/detail/employee/"+ employee.Name+"-"+ employee.EmployeeId}
              className="border-gray-300 border flex gap-2 mb-2 rounded-lg p-2 cursor-pointer hover:shadow-md hover:border-primary"
            >
              {employee.publicURL ? (
                <Image
                  src={employee.publicURL}
                  alt={employee.Name}
                  width={80}
                  height={80}
                  className='rounded-lg object-cover h-[100px]'
                />
              ) : (
                <div className='w-[80px] h-[100px] bg-gray-200 rounded-lg'></div> // Placeholder for missing image
              )}
              <div className=''>
                <h2 className='font-bold mt-8 ml-4'>{employee.Name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
