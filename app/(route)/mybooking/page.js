"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import { fetchAppointementsByUserId } from "@/app/service/appointement";

export default function MyBookings() {
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
      <h2 className="font-bold text-2xl">Bookings</h2>
      <Tabs defaultValue="account" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList app={app}/>
        </TabsContent>
        <TabsContent value="expired">
          <BookingList  />
        </TabsContent>
      </Tabs>
    </div>
  );
}
