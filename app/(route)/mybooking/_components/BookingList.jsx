"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, DollarSignIcon, MapPin, User, X } from "lucide-react";
import CancelAppointement from "./CancelAppointement";
import { updatebyId } from "@/app/service/Update";
import withAuth from "@/app/withAuth";

const formatTimeTo12Hour = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

export default function BookingList({ app, isValid }) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [apps, setApps] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  const handleAppointmentClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    console.log(`Appointment ID: ${appointmentId}`);
  };

  const handleImageClick = (url) => {
    setModalImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImageUrl("");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAppointmentId) return;
      console.log("Fetching data for ID:", selectedAppointmentId);
      try {
        const response = await updatebyId(selectedAppointmentId);
        console.log("Data fetched:", response);
        setApps(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedAppointmentId]);

  if (!app) {
    console.error("No appointments available");
    return (
      <p className="text-red-500 text-center">No appointments available.</p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shop
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {app.map((booking) => (
              <tr
                key={booking.AppointmentId}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleAppointmentClick(booking.AppointmentId)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {booking?.shop?.publicURL && (
                      <Image
                        className="h-10 w-10 rounded-full object-cover cursor-pointer"
                        src={booking.shop.publicURL}
                        alt="Shop's profile picture"
                        width={80}
                        height={40}
                        onClick={() =>
                          handleImageClick(booking?.shop?.publicURL)
                        }
                      />
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking?.shop?.Name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="text-primary" />
                    {booking?.shop?.Address}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <User className="text-primary" />
                    {booking?.employee?.Name}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="text-primary" />
                    {formatTimeTo12Hour(booking?.Time)}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar className="text-primary" />
                    {booking?.date}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    {booking?.services?.ServiceName}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <DollarSignIcon className="text-primary" />
                    {booking?.Price
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "PKR",
                          minimumFractionDigits: 0,
                        }).format(booking.Price)
                      : "Price not available"}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CancelAppointement AppointmentId={selectedAppointmentId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-primary"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={modalImageUrl}
              alt="Larger view"
              width={700}
              height={700}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
