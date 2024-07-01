"use client";
import React from "react";
import { useEffect, useState } from "react";
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
    <div className="mb-10 items-center flex flex-col gap-4">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Your Fav Shop</span>
      </h2>
      <h2 className="text-gray-500 text-xl">
        Search your Shop and book appointement on one click
      </h2>
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search...." />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </div>
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
      {category && category.map((categories,index)=>(
        <Link href={'/search/'+ categories.Slug}>
      <div key={index} style={{ background: 'rgb(128 0 128 / 60%)'}} className="flex flex-col text-center items-center 
        gap-2 p-5 m-2 rounded-lg cursor-pointer hover:scale-110 trasition-all ease-in-out">
        {categories.iconUrl && (
        <Image src={categories.iconUrl} alt='icon'  width={40} height={40}/>
         )}
         <label className="text-sm">{categories.Name} </label>
         </div>
         </Link>
))}
</div>
    </div>
  );
}
