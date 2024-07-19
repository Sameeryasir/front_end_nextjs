"use client";
import React from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import CancelAppointement from "./CancelAppointement";
import { useState } from "react";
export default function BookingList({ app }) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  if (!app) {
    console.error("Appointment is not available");
    return null;
  }

  const handleAppointmentClick = (AppointmentId) => {
    setSelectedAppointmentId(AppointmentId);
    console.log(`Appointment ID: ${AppointmentId}`);
  };

  return (
    <div className="space-y-4 px-4 md:px-0">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {app?.map((booking) => (
          <div
            key={booking.id}
            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
            onClick={() => handleAppointmentClick(booking.AppointmentId)}
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                {booking?.shop?.publicURL && (
                  <Image
                    className="h-full w-full object-cover md:w-48"
                    src={booking?.shop?.publicURL}
                    alt="Shop's profile picture"
                    width={192}
                    height={192}
                  />
                )}
              </div>
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
                </div>
                <div className="mt-4 md:mt-0 md:self-end">
                  <CancelAppointement AppointmentId={selectedAppointmentId} />
                </div>
              </div>
            </div>
          </div>
      ))}
      </div>
    </div>
  );
}
