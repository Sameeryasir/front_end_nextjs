"use client";
import React, { useEffect, useState } from "react";
import Bookings from "../_components/bookings";
import { fetchAppointements } from "@/app/service/appointement";
export default function BookingPage() {
  const [appointement,Setappointements]=useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await fetchAppointements();
        Setappointements(response);
      } 
      catch(error){
        console.error("Error fetching data :",error);
      }
    };
    fetchData();
  },[])

  return (
    <>
      <h1><Bookings appointements={appointement}/></h1>
    </>
  );
}
