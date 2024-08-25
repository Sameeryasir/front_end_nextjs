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
import Ratings from "@/app/(route)/ratings/_component/Ratings";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddShop from "@/app/(route)/admin/add-shop/_component/Addshop";

const ShopDetail = ({ shop, isValid }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isTokenPresent, setIsTokenPresent] = useState(false);

  useEffect(() => {
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
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  }

  const handleViewReviews = () => {
    console.log("View Reviews button clicked");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-wrap">
      {/* Shop Image */}
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

      {/* Shop Details */}
      <div className="w-full md:w-1/2 p-4 md:p-6">
        <p className="text-gray-600 mb-2">WELCOME TO</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{shop?.Name}</h1>
        <div className="mb-4">
          <div className="flex gap-2 mt-2 text-gray-500 items-center">
            <MapPin className="text-primary" />
            <h2 className="text-lg md:text-xl font-semibold">
              {shop?.Address}
            </h2>
          </div>
          <div className="flex gap-2 mt-2 text-gray-500 items-center">
            <User className="text-primary" />
            <h2 className="text-lg md:text-xl font-semibold">{shop?.Owner}</h2>
          </div>
          <p className="text-gray-600">{shop?.timing}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 mb-6">{shop?.Description}</p>
        </div>
        <div className="w-full flex justify-center md:justify-start">
          {isValid && user?.UserId !== shop?.user?.UserId && (
            <BookingAppointment shop={shop} />
          )}
        </div>

        {/* View Reviews Button */}
        <div className="w-full mt-4 flex justify-center md:justify-start">
          <Link href={`/ratings/${shop.Name}-${shop.ShopId}`}>
            <Button
              onClick={handleViewReviews}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              View Reviews
            </Button>
          </Link>
        </div>
      </div>

      {/* Slider for Services */}
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
    </div>
  );
};

export default ShopDetail;
