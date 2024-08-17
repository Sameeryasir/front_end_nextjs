"use client";
import React from "react";
import { useState, useEffect } from "react";
import { fetchShops } from "@/app/service/shops";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import { fetchCategory } from "@/app/service/Category";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Shoplist({}) {
  const [category, setCategory] = useState([]);
  const params = usePathname();
  const categories = params.split("/")[2];

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
    <div className="mt-5 flex flex-col">
      <Command>
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {category &&
              category.map((categoryItem) => (
                <CommandItem key={categoryItem.id}>
                  <Link
                    href={
                      "/search/" + categoryItem.Slug + "-" + categoryItem.id
                    }
                    className={`p-2 flex gap-2 items-center
                        text-[14px] text-primary rounded-md cursor-pointer w-full
                        ${categories == categoryItem.Name ? "bg-gray-200" : ""}
                        hover:bg-gray-100 transition-colors duration-200`}
                  >
                    {categoryItem.iconUrl && (
                      <Image
                        src={categoryItem.iconUrl}
                        alt="icon"
                        width={40}
                        height={40}
                        className="w-10 h-10 md:w-8 md:h-8"
                      />
                    )}
                    <label className="mt-2 text-sm md:text-base">
                      {categoryItem.Name}
                    </label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
