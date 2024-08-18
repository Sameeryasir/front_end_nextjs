"use client";
import React, { useEffect, useState, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import { fetchAppointementsByUserId } from "@/app/service/appointement";
import { useRouter } from "next/navigation";
import { AuthenticationContext } from "@/app/context/authentication";

export default function MyBookings() {
  const router = useRouter();
  const { isValid, setIsValid } = useContext(AuthenticationContext);
  const [app, SetAppointements] = useState([]);

  useEffect(() => {
    if (!isValid) {
      router.push("/logIn");
      return;
    }

    const fetchdata = async () => {
      SetAppointements([]);
      const token = localStorage.getItem("token");
      try {
        const response = await fetchAppointementsByUserId();
        SetAppointements(response);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };

    fetchdata();
  }, [isValid, router]);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsValid(true);
      } else {
        setIsValid(false);
        router.push("/logIn");
      }
    };

    checkAuthStatus();
  }, [setIsValid, router]);

  if (!isValid) {
    return null;
  }

  return (
    <div className="px-4 sm:px-10 mt-10">
      <BookingList app={app} isValid={isValid} />
    </div>
  );
}
