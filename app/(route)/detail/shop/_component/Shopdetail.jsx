import { MapPin, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import BookingAppointment from "../../employee/_component/BookingAppointement";
import Image from "next/image";
import { FaStar } from "react-icons/fa"; // Importing star icon from react-icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const ShopDetail = ({ shop, isValid }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isTokenPresent, setIsTokenPresent] = useState(false);

  useEffect(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsTokenPresent(true);
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // const handleSubmitRating = async (e) => {
  //   e.preventDefault();

  //   if (!shop?.ShopId) {
  //     console.error("Shop ID is missing");
  //     return;
  //   }

  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No token found");
  //     return;
  //   }

  //   const response = await fetch("http://localhost:3000/rating", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       Score: rating,
  //       Comment: comment,
  //       RatedAt: new Date().toISOString(),
  //       ShopId: shop.ShopId, // Use the shop's ID here
  //     }),
  //   });

  //   if (response.ok) {
  //     const result = await response.json();
  //     console.log("Rating added:", result);
  //   } else {
  //     console.error("Failed to add rating");
  //   }
  // };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <div className="relative">
          {shop?.publicURL && (
            <img
              src={shop?.publicURL}
              alt={shop?.Name}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 md:p-6">
        <p className="text-gray-600 mb-2">WELCOME TO</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{shop?.Name}</h1>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            <span className="inline-flex items-center">
              <div className="flex gap-2 mt-2 text-gray-500">
                <MapPin className="text-primary" />
                <h2 className="text-lg md:text-xl font-semibold">
                  {shop?.Address}
                </h2>
              </div>
            </span>
          </p>
          <p className="flex gap-2 mt-2 text-gray-500">
            <User className="text-primary" />
            <h2 className="text-lg md:text-xl font-semibold">{shop?.Owner}</h2>
          </p>
          <p className="text-gray-600">{shop?.timing}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 mb-6">{shop?.Description}</p>
        </div>
        <div className="w-full flex justify-center md:justify-start">
          {isValid && <BookingAppointment shop={shop} />}
        </div>
      </div>

      {/* Slider for services */}
      <div className="w-full mt-8">
        <Slider {...settings}>
          {shop?.services?.map((service) => (
            <div
              key={service.ServiceId}
              className="text-center mb-4 rounded-lg p-4"
            >
              {service?.publicURL && (
                <Image
                  src={service?.publicURL}
                  alt={service.ServiceName}
                  className="w-12 h-12 mx-auto"
                  width={200}
                  height={200}
                />
              )}
              <p className="text-lg font-semibold mt-2">
                {service?.ServiceName}
              </p>
              <p className="text-gray-600">
                Rs{service.ServicePrice.toFixed(2)}
              </p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Rating section */}
      {/* <div className="w-full mt-8">
        <h2 className="text-xl font-semibold mb-4">Rate this Shop</h2>
        <form
          onSubmit={handleSubmitRating}
          className="flex flex-col items-center"
        >
          <div className="flex mb-4">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={30}
                    color={
                      currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                    style={{ cursor: "pointer" }}
                  />
                </label>
              );
            })}
          </div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Leave a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className={`px-4 py-2 bg-primary text-white rounded-md ${
              !isTokenPresent ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isTokenPresent}
          >
            Submit Rating
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default ShopDetail;
