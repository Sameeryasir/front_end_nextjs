"use client";
import React, { useEffect,useState } from 'react'
import { fetchShops } from '@/app/service/shops';
import Shop from '@/app/_components/Shop';
export default function search({params}) {
  const [shops, setShops] = useState([]);
  
  useEffect(() => {
    console.log(params.sname);
    const fetchData = async () => {
      try {
        const response = await fetchShops();
        setShops(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  return (
    <div><Shop heading={params.sname}/></div>
  )
}
