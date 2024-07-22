"use client";
import { fetchInventoryByShopId } from "@/app/service/inventory";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Inventory from "../_component/Inventory";

export default function Page() {
  const [inventory, setInventory] = useState([]);
  const params = usePathname();
  const shopname = params.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryArray = shopname.split("-");
        const id = inventoryArray[inventoryArray.length - 1];
        console.log("Fetching inventory for ID:", id);
        const response = await fetchInventoryByShopId(id);
        setInventory(response);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div>
      <Inventory inventory={inventory} />
    </div>
  );
}
