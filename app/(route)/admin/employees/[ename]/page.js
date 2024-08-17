"use client";
import { fetchEmployeesByshop } from "@/app/service/getEmployeeByShop";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Employees from "../_components/Employees";

export default function Page() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Constant limit, no need for setLimit
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = usePathname();
  const employeeName = params.split("/")[3];

  const fetchData = async (currentPage) => {
    try {
      setIsLoading(true);
      setError(null);
      const employeeNameArray = employeeName.split("-");
      const id = employeeNameArray[employeeNameArray.length - 1];
      const response = await fetchEmployeesByshop(id, currentPage, limit);
      const fetchedEmployees = response?.data || [];

      if (fetchedEmployees.length === 0 && currentPage > 1) {
        setPage(currentPage - 1); // Go to the previous page
        return;
      }

      setEmployees(fetchedEmployees);
      setTotalPages(Math.ceil(response.total / limit)); // Assuming the response has a total count of employees

      if (currentPage > 1 && fetchedEmployees.length === 0) {
        setPage(1);
        fetchData(1); // Fetch the first page's data if current page is empty
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [params, page]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleDelete = async (employeeId) => {
    try {
      // Assuming you have a function to delete an employee
      await deleteEmployee(employeeId);

      // After deleting, refetch the data for the current page
      fetchData(page);
      
      // If all employees on the current page are deleted, go back to the previous page
      if (employees.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchData(page);
      }
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <Employees employees={employees} onDelete={handleDelete} />
      )}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-l ${
            page <= 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-white border-t border-b border-gray-300 text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded-r ${
            page >= totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
