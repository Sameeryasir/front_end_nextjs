"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import Shop from "@/app/_components/Shop";
import { fetchShopsById } from "@/app/service/shops";
export default function details() {

  const [shops, setShops] = useState([]);
  const params = usePathname();
  const shopName = params.split("/")[3];

  useEffect(() => {
    setShops([]);

    const fetchData = async () => {
      try {
        const shopNameArray = shopName.split("-");
        const id = shopNameArray[shopNameArray.length - 1];
        const response = await fetchShopsById(id);
        setShops(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params]);
  return (
    <div>
      <Shop shops={shops} />
    </div>
  );
}
