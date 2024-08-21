"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { fetchCategory } from "../service/Category";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Searchlist() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategory();
        setCategory(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-20 mb-10 flex flex-col items-center gap-4">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-wide text-center px-4">
        Search <span className="text-primary">Your Fav Shop</span>
      </h2>
      <h2 className="text-gray-500 text-base sm:text-lg md:text-xl text-center px-4">
        Search your Shop and book appointment with one click
      </h2>
     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
        {category &&
          category.map((categories, index) => (
            <Link
              href={`/search/${categories.Slug}-${categories.id}`}
              key={index}
            >
              <div
                
                className="flex flex-col text-center items-center gap-2 p-3 sm:p-4 md:p-5 rounded-lg cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                {categories.iconUrl && (
                  <Image
                    src={categories.iconUrl}
                    alt="icon"
                    width={40}
                    height={40}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                )}
                <label className="text-xs sm:text-sm md:text-base">
                  {categories.Name}
                </label>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
