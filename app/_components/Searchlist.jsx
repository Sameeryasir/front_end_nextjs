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
  const [visible, setVisible] = useState(false);

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

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`mt-20 mb-10 flex flex-col items-center gap-4 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-wide text-center px-4">
        Search <span className="text-primary">Your Fav Shop</span>
      </h2>
      <h2 className="text-gray-500 text-base sm:text-lg md:text-xl text-center px-4">
        Search your Shop and book appointment with one click
      </h2>
      <div className="flex w-full mt-3 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl items-center space-x-2 px-4">
        <Input type="text" placeholder="Search..." className="flex-grow focus:ring-2 focus:ring-primary focus:outline-none" />
        <Button type="submit" className="flex-shrink-0 hover:bg-primary-dark focus:ring-2 focus:ring-primary transition-all duration-300">
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
        {category &&
          category.map((categories, index) => (
            <Link href={`/search/${categories.Slug}-${categories.id}`} key={index}>
              <div
                style={{ background: "rgb(128 0 128 / 60%)" }}
                className="flex flex-col text-center items-center gap-2 p-3 sm:p-4 md:p-5 rounded-lg cursor-pointer hover:scale-105 hover:bg-purple-700 hover:shadow-lg transition-all duration-300 ease-in-out"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {categories.iconUrl && (
                  <Image
                    src={categories.iconUrl}
                    alt="icon"
                    width={40}
                    height={40}
                    className="transition-transform duration-300"
                  />
                )}
                <label className="text-xs sm:text-sm md:text-base">{categories.Name}</label>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
