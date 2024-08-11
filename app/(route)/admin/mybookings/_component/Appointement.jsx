"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  DollarSignIcon,
  MapPin,
  Server,
  User,
} from "lucide-react";
import Cancel from "@/app/(route)/mybooking/_components/CancelAppointement";
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

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    let hours12 = date.getHours() % 12 || 12;
    let ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours12}:${minutes.padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Picture
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Shop Name
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Address
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Time
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Date
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Employee
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Service
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Price
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {app?.map((booking) => (
            <tr key={booking?.AppointmentId} className="hover:bg-gray-50">
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap flex items-center border-r border-gray-200">
                {booking?.shop?.publicURL && (
                  <Image
                    src={booking?.shop?.publicURL || "/default-image.jpg"}
                    alt="Shop's profile picture"
                    className="rounded-full object-cover w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                    width={80}
                    height={80}
                    layout="fixed"
                  />
                )}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                {booking?.shop?.Name}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {booking?.shop?.Address}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {formatTime(booking?.Time)}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {booking?.date}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {booking?.employee?.Name}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {booking?.services?.ServiceName}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {booking?.Price
                  ? new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 0,
                    }).format(booking.Price)
                  : "Price not available"}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2 sm:space-x-3">
                  <Cancel AppointmentId={booking.AppointmentId} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
