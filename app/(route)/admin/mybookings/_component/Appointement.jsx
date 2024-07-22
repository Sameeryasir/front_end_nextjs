"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, DollarSignIcon, MapPin, Server, User } from "lucide-react";
import CancelAppointment from "@/app/(route)/mybooking/_components/CancelAppointement";
import { updatebyId } from "@/app/service/Update";
import Accept from "../../_components/Accept";
export default function Appointment({ app }) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [apps, SetApps] = useState();

  const handleAppointmentClick = (AppointmentId) => {
    setSelectedAppointmentId(AppointmentId);
    console.log(`Appointment ID: ${AppointmentId}`);
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await updatebyId(selectedAppointmentId);
        SetApps(response);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    if (selectedAppointmentId) {
      fetchdata();
    }
  }, [selectedAppointmentId]);

  if (!app) {
    console.error("Appointment is not available");
    return null;
  }

  return (
    <div className="space-y-4 px-4 md:px-0">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {app?.map((booking) => (
          <div
            key={booking.AppointmentId}
            className="bg-white rounded-xl shadow-md overflow-hidden"
            onClick={() => handleAppointmentClick(booking.AppointmentId)}
          >
            <div className="md:flex">
              {booking?.shop?.publicURL && (
                <div className="md:flex-shrink-0">
                  <Image
                    className="h-auto w-full object-cover md:w-48"
                    src={booking?.shop?.publicURL}
                    alt="Shop's profile picture"
                    width={192}
                    height={192}
                  />
                </div>
              )}
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                    {booking?.shop?.Name}
                  </div>
                  <p className="flex gap-2 mt-2 text-gray-500 items-center">
                    <MapPin className="text-primary" /> {booking?.shop?.Address}
                  </p>
                  <p className="mt-2 text-gray-500 flex gap-2 items-center">
                    <User className="text-primary" /> {booking?.employee?.Name}
                  </p>
                  <p className="mt-2 text-gray-500 flex gap-2 items-center">
                    <Clock className="text-primary" /> {booking?.Time}
                  </p>
                  <p className="mt-2 text-gray-500 flex gap-2 items-center">
                    <Calendar className="text-primary" /> {booking?.date}
                  </p>
                  <p className="mt-2 text-gray-500 flex gap-2 items-center">
                    <Server className="text-primary" /> {booking?.service?.ServiceName}
                  </p>
                  <p className="mt-2 text-gray-500 flex gap-2 items-center">
                    <DollarSignIcon className="text-primary" />
                    {booking?.Price
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "PKR",
                          minimumFractionDigits: 0,
                        }).format(booking.Price)
                      : "Price not available"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2 px-3 pb-3">
                  <CancelAppointment AppointmentId={selectedAppointmentId} />
                  <Accept AppointmentId={selectedAppointmentId} />
                </div>
          </div>
        ))}
      </div>
    </div>
  );
}
