"use client";   
import React from 'react'
import { useState,useEffect } from 'react';
import { fetchshopsByUserId } from '@/app/service/getshopsbyUser';
import Shops from '../_components/Shops';
export default function page() {
    const [shops, Setshops] = useState([]);
  useEffect(() => {
    Setshops([]);
    const fetchdata = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetchshopsByUserId();
        Setshops(response);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchdata();
  }, []);
  return (
    <div><Shops shops={shops}/></div>
  )
}
