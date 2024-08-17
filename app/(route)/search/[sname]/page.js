"use client";
import React, { useEffect, useState } from "react";
import { fetchShops } from "@/app/service/shops";
import Shop from "@/app/_components/Shop";
import { usePathname } from "next/navigation";

export default function Search() {
  const [shops, setShops] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Constant limit, no need for setLimit
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = usePathname();
  const categoryName = params.split("/")[2];

  const fetchData = async (currentPage) => {
    try {
      setIsLoading(true);
      setError(null);
      const categoryNameArray = categoryName.split("-");
      const id = categoryNameArray[categoryNameArray.length - 1];
      const response = await fetchShops(id, currentPage, limit);
      const fetchedShops = response?.data || [];

      if (fetchedShops.length === 0 && currentPage > 1) {
        setPage(currentPage - 1); // Go to the previous page if no data is found
        return;
      }

      setShops(fetchedShops);
      setTotalPages(Math.ceil(response.total / limit)); // Assuming the response has a total count of shops
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

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <Shop shops={shops} />
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
