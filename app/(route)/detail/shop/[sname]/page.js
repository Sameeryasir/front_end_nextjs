"use client";
import { usePathname } from "next/navigation";
import { AuthenticationContext } from "@/app/context/authentication";
import React from "react";
import { useState, useEffect } from "react";
import { fetchShopsById } from "@/app/service/shops";
import Shopdetail from "../_component/Shopdetail";
import Employeelist from "../_component/Employeelist";
import  { useContext } from "react";
import { useRouter } from "next/navigation";
export default function details() {
  const router = useRouter();
  const { isValid } = useContext(AuthenticationContext);

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
        console.log(response);
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
        <Shopdetail  shop= {shop} isValid={isValid}/>
      <Employeelist shop={shop}/>
    </div>
  );
}
