import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User, Clock, NotebookPen } from "lucide-react";
import BookingAppointement from "../../employee/_component/BookingAppointement";
import { fetchService } from "@/app/service/Service";

export default function ShopDetail({ shop }) {

  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <div className="md:flex gap-4 items-center">
        {shop?.publicURL && (
          <Image
            src={shop.publicURL}
            width={150}
            height={150}
            className="rounded-full h-[150px] object-cover"
            alt="shop-image"
          />
        )}
        <div className="flex justify-between items-center w-full mt-4 md:mt-0">
          <div className="flex flex-col items-baseline">
            {shop?.category && (
              <h2 className="text-primary p-1 px-3 text-lg bg-purple-100 rounded-full">
                {shop.category.Name}
              </h2>
            )}
            <h2 className="text-[40px] font-bold">{shop.Name}</h2>
            {shop?.Address && (
              <h2 className="flex gap-2 text-lg text-gray-500 items-center">
                <MapPin />
                {shop.Address}
              </h2>
            )}
          </div>
          <div className='flex flex-col gap-5 items-center'>
            <h2 className='flex gap-1 text-xl text-primary'><User /> {shop?.Owner} </h2>
            <h2 className='flex gap-2 text-xl text-gray-500'><Clock /> Available 8:00 AM to 10:PM </h2>
            <BookingAppointement />
          </div>
        </div>
      </div>
    </div>
  );
}
