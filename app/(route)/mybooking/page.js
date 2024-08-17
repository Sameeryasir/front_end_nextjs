"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import { fetchAppointementsByUserId } from "@/app/service/appointement";
import  { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthenticationContext } from "@/app/context/authentication";

export default function MyBookings() {
  const router = useRouter();
  const { isValid } = useContext(AuthenticationContext);
  const [app, SetAppointements] = useState([]);
  useEffect(() => {
    
    SetAppointements([]);
    const fetchdata = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetchAppointementsByUserId();
        SetAppointements(response);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchdata();
  }, []);
 
  return (
    <div className="px-4 sm:px-10 mt-10">
      <BookingList app={app} />
    </div>
  );
}
