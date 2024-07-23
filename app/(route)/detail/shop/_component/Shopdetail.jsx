import { MapPin, User } from "lucide-react";
import React from "react";
import BookingAppointment from "../../employee/_component/BookingAppointement";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ShopDetail = ({ shop }) => {
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-wrap transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
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
                <h2 className="text-lg md:text-xl font-semibold"> {shop?.Address}</h2>
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
          <BookingAppointment />
        </div>
      </div>
      <div className="w-full mt-8">
        <div className="flex flex-wrap justify-around">
          {shop?.service?.map((service) => (
            
            <div
              key={service.ServiceId}
              className="text-center w-1/2 sm:w-1/4 lg:w-1/5 mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 rounded-lg p-4"
            >
              {service?.publicURL && (
                <img
                  src={service?.publicURL}
                  alt={service.ServiceName}
                  className="w-12 h-12 mx-auto"
                />
              )}
              <p className="text-lg font-semibold mt-2">{service.ServiceName}</p>
              <p className="text-gray-600">Rs{service.ServicePrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
