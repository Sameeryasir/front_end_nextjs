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

  console.log(params);

  return (
    <div className="h-screen   mt-5 flex flex-col">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {category &&
              category.map((categories) => (
                <>
                  <CommandItem>
                    <Link
                      a
                      href={"/search/" + categories.Slug+ "-" + categories.id}
                      className={`p-2 flex gap-2
                      text-[14px] text-primary rounded-md cursor-pointer w-full
                      ${categories == categories.Name}
                      `}
                    >
                      {categories.iconUrl && (
                        <Image
                          src={categories.iconUrl}
                          alt="icon"
                          width={40}
                          height={40}
                        />
                      )}
                      <label className="mt-2">{categories.Name}</label>
                    </Link>
                  </CommandItem>
                </>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
