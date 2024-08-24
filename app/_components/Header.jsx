"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthenticationContext } from "../context/authentication";

export default function Header() {
  const { isValid, setIsValid } = useContext(AuthenticationContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsValid(false);
    window.location.reload();
  };

  const islogIn = () => {
    let token = localStorage.getItem("token");
    console.log("testing ==>", token);
    return !!token;
  };

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    // Conditionally add the Bookings menu item if the user is not an Admin
    ...(user?.UserType !== "Admin"
      ? [
          {
            id: 2,
            name: "Bookings",
            path: "/mybooking",
          },
        ]
      : []),
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
      {islogIn() ? (
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
