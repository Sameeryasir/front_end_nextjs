"use client";
import React, { useEffect, useState } from "react";
import { fetchShops } from "@/app/service/shops";
import Shop from "@/app/_components/Shop";
import { usePathname } from "next/navigation";

export default function Search() {
  const [shops, setShops] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const params = usePathname();
  const categoryName = params.split("/")[2];

  useEffect(() => {
    setShops([]);

    const fetchData = async () => {
      try {
        const cateroryNameArray = categoryName.split("-");
        const id = cateroryNameArray[cateroryNameArray.length - 1];
        const response = await fetchShops(id, page, limit);
        setShops(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params, page, limit]); // Include page and limit in dependency array

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Shop shops={shops} />
      <div className="flex justify-center mt-4">
    <button
      className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-l ${
        page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
      }`}
      onClick={() => handlePageChange(page - 1)}
      disabled={page <= 1}
    >
      Previous Page
    </button>
    <button
      className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300`}
      onClick={() => handlePageChange(page + 1)}
    >
      Next Page
    </button>
  </div>
    </div>
  );
}
