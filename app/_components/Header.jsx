"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Header() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/home",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/contactus",
    },
  ];
  return (
    <div
      className="flex items-center 
    justify-between p-4 shadow-sm"
    >
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <li
              className=" hover:text-primary cursor-pointer hover:scale-105 trasition-all ease-in-out"
              key={`nav_${index}`}
            >
              <Link href={{ pathname: item.path }}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Button>Get Started</Button>
    </div>
  );
}
