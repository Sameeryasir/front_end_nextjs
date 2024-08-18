"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthenticationContext } from "@/app/context/authentication";
import { fetchAppointementsByUserId } from "@/app/service/appointement";
import BookingList from "./_components/BookingList";

export default function MyBookings() {
  const router = useRouter();
  const { isValid, setIsValid } = useContext(AuthenticationContext);

  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Constant limit
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isValid) {
      router.push("/logIn");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsValid(false);
          router.push("/logIn");
          return;
        }

        const response = await fetchAppointementsByUserId(page, limit); // Pass the current page
        setAppointments(response.data || []);
        setTotalPages(Math.ceil(response.total / limit)); // Assuming the response includes a total count
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetchData function here with updated page value
  }, [isValid, page, router, setIsValid, limit]); // Add `limit` as a dependency

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsValid(true);
      } else {
        setIsValid(false);
        router.push("/logIn");
      }
    };

    checkAuthStatus();
  }, [setIsValid, router]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (!isValid) {
    return null;
  }

  return (
    <div className="px-4 sm:px-10 mt-10">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <BookingList app={appointments} isValid={isValid} />
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
        </>
      )}
    </div>
  );
}
