"use client";
import { fetchEmployeesByshop } from '@/app/service/getEmployeeByShop';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Employees from '../_components/Employees';

export default function page() {
  const [employees,setEmployees]=useState([]);
  const params=usePathname();
  const employeeName=params.split("/")[3];
  useEffect(()=>{
    setEmployees([]);
    const fetchData = async ()=>{
     try{
      const employeeNameArray= employeeName.split("-");
      const id=employeeNameArray[employeeNameArray.length-1];
      const response = await fetchEmployeesByshop(id);
      console.log(response);
      setEmployees(response);}
     catch (error) {
      console.log("error fetching data:",error)
    }
  };
  fetchData()
},[params])
  return (
    <div><Employees employees={employees}/></div>
  )
}
