"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { fetchShopsById } from "@/app/service/shops";
import Shopdetail from "../_component/Shopdetail";
import Employeelist from "../_component/Employeelist";
import ShopDescription from "../_component/ShopDescription";
export default function details() {
  const [shop, setShop] = useState([]);
  const params = usePathname();
  const shopName = params.split("/")[3];

  useEffect(() => {
    setShop([]);

    const fetchData = async () => {
      try {
        const shopNameArray = shopName.split("-");
        const id = shopNameArray[shopNameArray.length - 1];
        const response = await fetchShopsById(id);
        setShop(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params]);
  return (
    <div className='py-8 md:py-20
    px-10 md:px-36'>
        <Shopdetail shop= {shop} />

        <div className='grid grid-cols-3 mt-16'>
          <div className='col-span-3 md:col-span-2 order-last md:order-first'>
          <ShopDescription shop={shop}/>
          </div>
          <div className=''><Employeelist shop={shop}/>
          </div>
        </div>
    
    </div>
  );
}
