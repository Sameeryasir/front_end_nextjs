"use client";

import React, { useState, useEffect } from "react";
import Ratings from "../_component/Ratings";
import { usePathname } from "next/navigation";
import { GetRatings } from "@/app/service/ratings";

export default function Page() {
  const [ratings, setRatings] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10); // Constant limit, no need for setLimit
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const params = usePathname();
  const shopName = params.split("/")[2];

  const fetchData = async (currentPage) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear any previous errors
    setRatings([]);

    try {
      const shopNameArray = shopName.split("-");
      const id = shopNameArray[shopNameArray.length - 1];
      console.log("id is ", id);

      const response = await GetRatings(id, currentPage, limit);
      console.log(response);

      if (response.data.length === 0 && currentPage > 1) {
        setPage(currentPage - 1);
        return;
      }

      setRatings(response.data);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setError("Failed to load ratings. Please try again later.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData(page); // Fetch data when page or shopName changes
  }, [params, page]);

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
        <Ratings ratings={ratings} />
      )}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-l ${
            page <= 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white "
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
              : "bg-primary text-white "
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
