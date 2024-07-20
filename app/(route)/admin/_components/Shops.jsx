import React from "react";
import Image from "next/image";
import { MapPin, User } from "lucide-react";
import Link from "next/link";

export default function EnhancedShops({ shops }) {
  return (
    <div className="max-w-full mx-auto overflow-hidden">
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
        {shops?.map((item) => (
          <div
            key={item?.id}
            className=" m-4 bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex p-8 gap-6 pb-0">
              <div className="md:flex-shrink-0">
                {item?.publicURL && (
                  <Image
                    className="rounded-xl h-48 w-full object-contain md:h-full md:w-48"
                    src={item?.publicURL}
                    alt="Product Image"
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <div>
                <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                    {item?.Name}
                </div>
                <p className="flex gap-2 mt-2 text-gray-500">
                  <User className="text-primary" />
                  {item?.Owner}
                </p>
                <p className="flex gap-2 mt-2 text-gray-500">
                  <MapPin className="text-primary" />
                  {item?.Address}
                </p>
                <div className="mt-4 grid gap-4">
                  
                  <button className="px-4 py-2 bg-green-500 text-white rounded ">
                    View Employee
                  </button>
                  <a href="/admin/inventory">
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded">
                    View Inventory
                  </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="p-8 pt-4">
              <p className="mt-2 text-gray-500">{item?.Description}</p>
              <div className="mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
