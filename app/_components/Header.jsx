"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Bookings",
      path: "/mybooking",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/contactus",
    },
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <Link key={item.id} href={item.path}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {isAuthenticated ? (
        <Button
          onClick={handleLogout}
          className="hover:scale-105 transition-all ease-in-out"
        >
          Log Out
        </Button>
      ) : (
        <Link href="/logIn">
          <Button className="hover:scale-105 transition-all ease-in-out">
            Log In
          </Button>
        </Link>
      )}
    </div>
  );
}
