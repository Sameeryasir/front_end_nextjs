"use client";
import React, { useEffect, useState } from "react";
import Bookings from "../_components/bookings";
import { fetchAppointements } from "@/app/service/appointement";
import { fetchAppointementbyAdmin } from "@/app/service/appbyUser";
export default function BookingPage() {
  const [appointement,Setappointements]=useState([]);
  useEffect(()=>{
    Setappointements([])
    const fetchData = async ()=>{
      const token = localStorage.getItem("token");
      try{
        const response = await fetchAppointementbyAdmin();
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
