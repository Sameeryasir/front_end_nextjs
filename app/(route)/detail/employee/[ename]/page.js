"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import EmployeeDetail from "../_component/EmployeeDetail";
import { fetchEmployeesbyId } from "@/app/service/employee";
import EmployeeDescription from "../_component/EmployeeDescription";

export default function details() {
  const [employee, setEmployee] = useState([]);
  const params = usePathname();
  const employeename = params.split("/")[3];

  useEffect(() => {
    setEmployee([]);
    const fetchData = async () => {
      try {
        const employeenamearray = employeename.split("-");
        const id = employeenamearray[employeenamearray.length - 1];
        const response = await fetchEmployeesbyId(id);
        setEmployee(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params]);
  return (
    <div
      className="py-8 md:py-20
  px-10 md:px-36"
    >
      <EmployeeDetail employee={employee} />
    </div>
  );
}
