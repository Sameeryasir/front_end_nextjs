"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const fetchAverageRating = async (ShopId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/rating/${ShopId}/average`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch average rating");
    }
    const averageRating = await response.json();
    return averageRating;
  } catch (error) {
    console.error(error);
    return null; // Return null or some default value if there's an error
  }
};

export default function Shop({ shops = [] }) {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingsData = {};
      for (const shop of shops) {
        const averageRating = await fetchAverageRating(shop.ShopId);
        ratingsData[shop.ShopId] = averageRating !== null ? averageRating : 0; // Default to 0 if no rating
      }
      setRatings(ratingsData);
    };

    fetchRatings();
  }, [shops]);

  return (
    <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
      {shops.length > 0 && (
        <div className="flex flex-wrap gap-8 ml-2">
          {shops.map((shop) => (
            <div key={shop.ShopId} className="p-4 md:p-0 w-80">
              <section className="p-4 py-8 bg-purple-50 text-center transform duration-500 hover:scale-105 hover:shadow-lg cursor-pointer transition-all">
                {shop.publicURL && (
                  <div className="relative w-[300px] h-[300px] overflow-hidden rounded-3xl">
                    <Image
                      src={shop.publicURL}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out hover:scale-110"
                      alt=""
                    />
                  </div>
                )}
                <Link href={`/ratings/${shop.Name}-${shop.ShopId}`}>
                  <div className="flex justify-center mt-6 space-x-1">
                    {/* Render stars based on the specific shop's average rating */}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 fill-current ${
                          ratings[shop.ShopId] &&
                          star <= Math.floor(ratings[shop.ShopId])
                            ? "text-orange-600"
                            : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                      >
                        <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                      </svg>
                    ))}
                  </div>
                </Link>

                <h1 className="text-2xl my-4 transition-transform duration-300 hover:scale-105 hover:text-primary">
                  {shop.Name}
                </h1>
                <p className="mb-4 text-sm text-gray-600 transition-colors duration-300 hover:text-gray-900">
                  {shop.Address}
                </p>
                <Link href={`/detail/shop/${shop.Name}-${shop.ShopId}`}>
                  <Button className="p-2 px-4 border border-primary bg-white text-primary rounded-full w-full text-center text-sm mt-2 cursor-pointer transition-transform duration-300 ease-in-out hover:bg-primary hover:text-white hover:scale-105">
                    Book Now
                  </Button>
                </Link>
              </section>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
