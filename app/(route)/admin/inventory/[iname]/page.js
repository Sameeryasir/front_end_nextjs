"use client";
import { fetchInventoryByShopId } from "@/app/service/inventory";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Inventory from "../_component/Inventory";

export default function Page() {
  const [inventory, setInventory] = useState([]);
  const params = usePathname();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMoreData, setHasMoreData] = useState(true);
  const shopname = params.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryArray = shopname.split("-");
        const id = inventoryArray[inventoryArray.length - 1];
        console.log("Fetching inventory for ID:", id);
        const response = await fetchInventoryByShopId(id,page,limit);
        const fetchedInventory= response?.data || [];

        setInventory(fetchedInventory);
        setHasMoreData(fetchedInventory.length===limit);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchData();
  }, [params,page,limit]);

  const handlePageChange = (newPage) => {
    if (newPage > page && !hasMoreData) {
      return;
    }
    setPage(newPage);
  };

  return (
    <div>
      <Inventory inventory={inventory} />
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-l ${
            page <= 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous Page
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            hasMoreData
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-gray-200 text-gray-400 hover: cursor-not-allowed"
          }`}
          onClick={() => handlePageChange(page + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
