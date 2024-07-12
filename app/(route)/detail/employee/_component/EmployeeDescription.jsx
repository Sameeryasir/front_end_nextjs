import React from 'react'

export default function EmployeeDescription({employee}) {
  return (
    <div>
    {employee?.Description && (
      <>
        <h2 className='font-bold text-[25px]'>Description</h2>
        <p className='mt-4 text-lg text-gray-600'>{employee.Description}</p>
      </>
    )}

   
  </div>  )
}

