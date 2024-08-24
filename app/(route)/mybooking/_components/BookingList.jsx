"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  DollarSignIcon,
  MapPin,
  User,
  X,
  Star,
} from "lucide-react";
import { FaStar } from "react-icons/fa";
import CancelAppointement from "./CancelAppointement";
import { updatebyId } from "@/app/service/Update";

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
  const [ratingInfo, setRatingInfo] = useState({
    visible: false,
    appointmentId: null,
    shopId: null,
  });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [ratingError, setRatingError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsTokenPresent(!!token);
  }, []);

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

  const handleRateClick = (appointmentId, shopId) => {
    setRatingInfo({ visible: true, appointmentId, shopId });
    console.log(`Rate Appointment ID: ${appointmentId}, Shop ID: ${shopId}`);
  };

  const closeRatingModal = () => {
    setRatingInfo({ visible: false, appointmentId: null, shopId: null });
    setRating(0);
    setHover(0);
    setComment("");
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();

    // Reset error messages
    setRatingError("");
    setCommentError("");
    setGeneralError("");

    // Validate rating
    if (rating === 0) {
      setRatingError("Rating is required.");
      return;
    }

    // Validate comment
    if (!comment.trim()) {
      setCommentError("Comment is required.");
      return;
    } else if (/^\d+$/.test(comment.trim())) {
      setCommentError("Comment should not contain only numeric values.");
      return;
    }

    // Ensure shopId is present
    if (!ratingInfo.shopId) {
      setGeneralError("Shop ID is missing");
      return;
    }

    const token = localStorage.getItem("token");

    // Ensure token is present
    if (!token) {
      setGeneralError("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Score: rating,
          Comment: comment,
          RatedAt: new Date().toISOString(),
          ShopId: ratingInfo.shopId,
          appId: ratingInfo.appointmentId, // Include the appointment ID for validation
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Rating added:", result);
        closeRatingModal();
      } else if (response.status === 500) {
        // Show the error dialog if the appointment has already been rated
        setErrorDialogVisible(true);
      } else {
        setGeneralError("Failed to add rating");
      }
    } catch (error) {
      setGeneralError("An error occurred while submitting the rating.");
      console.error("An error occurred:", error);
    }
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
              <th className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                Service
              </th>
              <th className="px-6 py-4 whitespace-nowrap">
                Price
              </th>
              <th className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                  {booking?.services?.map((service, index) => (
                    <span key={index}>
                      {service.ServiceName}
                      {index < booking.services.length - 1 && ", "}{" "}
                    </span>
                  ))}
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
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                  <CancelAppointement AppointmentId={selectedAppointmentId} />
                  <button
                    onClick={() =>
                      handleRateClick(
                        booking.AppointmentId,
                        booking.shop.ShopId
                      )
                    }
                    className="text-primary flex items-center gap-2 px-20 py-2 border border-primary rounded-md hover:bg-primary hover:text-white"
                  >
                    <Star className="h-4 w-4" />
                    Rate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rating Modal */}
      {ratingInfo.visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Rate Appointment
              </h3>
              <button
                onClick={closeRatingModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitRating}>
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-xl ${
                      index < (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(index + 1)}
                    onMouseEnter={() => setHover(index + 1)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
              {ratingError && (
                <p className="text-red-500 text-sm mb-4">{ratingError}</p>
              )}
              <div className="mb-4">
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2"
                  rows="4"
                  placeholder="Leave a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                {commentError && (
                  <p className="text-red-500 text-sm mt-2">{commentError}</p>
                )}
              </div>
              {generalError && (
                <p className="text-red-500 text-sm mb-4">{generalError}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error Dialog */}
      {errorDialogVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Error</h3>
              <button
                onClick={() => setErrorDialogVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-700">
              This appointment has already been rated.
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setErrorDialogVisible(false)}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
