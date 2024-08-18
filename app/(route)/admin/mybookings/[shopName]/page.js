"use client";
import React, { useEffect, useState } from "react";
import Appointment from "../_component/Appointement";
import { fetchAppointmentsByShopId } from "@/app/service/appbyUser";
import { usePathname } from "next/navigation";

export default function Page() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Constant limit
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = usePathname();
  const shopName = params.split("/")[3];

  const fetchData = async (currentPage) => {
    try {
      setIsLoading(true);
      setError(null);
      const shopNameArray = shopName.split("-");
      const id = shopNameArray[shopNameArray.length - 1];
      console.log("id", shopNameArray);
      const response = await fetchAppointmentsByShopId(id, currentPage, limit);
      const fetchedAppointments = response?.appointments || [];

      if (fetchedAppointments.length === 0 && currentPage > 1) {
        setPage(currentPage - 1); // Go to the previous page if no data is found
        return;
      }

      setAppointments(fetchedAppointments);
      setTotalPages(Math.ceil(response.total / limit)); // Assuming response contains total count of appointments
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <Appointment app={appointments} />
      )}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-l ${
            page <= 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
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
              : "bg-primary text-white"
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
