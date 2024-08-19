"use client";
import React from 'react'
import InventoryForm from './_component/inventory'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContext } from 'react';
import { AuthenticationContext } from "@/app/context/authentication";
export default function page() {
  const router = useRouter();
  const { isValid, setIsValid } = useContext(AuthenticationContext);
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsValid(true);
      } else {

        setIsValid(false);
        router.push("/logIn");
      }
    };

    checkAuthStatus();
  }, [isValid, router]);
  return (
    <div><InventoryForm isValid={isValid}/></div>
  )
}
