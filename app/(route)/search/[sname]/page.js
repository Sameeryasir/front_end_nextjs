"use client";
import React, { useEffect, useState } from "react";
import { fetchShops } from "@/app/service/shops";
import Shop from "@/app/_components/Shop";
import { fetchCategory } from "@/app/service/Category";
import { usePathname } from "next/navigation";

export default function search() {
  const [shops, setShops] = useState([]);
  const params = usePathname();
  const categoryName = params.split("/")[2];

  useEffect(() => {
    setShops([]);

    const fetchData = async () => {
      try {
        const cateroryNameArray = categoryName.split("-");
        const id = cateroryNameArray[cateroryNameArray.length - 1];
        const response = await fetchShops(id);
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
