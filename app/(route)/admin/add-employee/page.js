"use client";
import React, { useContext } from "react";
import Addemployee from "./_component/Addemployee";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthenticationContext } from "@/app/context/authentication";
export default function page() {
  const router = useRouter();
  const { isValid, setIsValid } = useContext(AuthenticationContext);

  console.log("isValid", isValid);

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
    <div>
      <Addemployee isValid={isValid} />
    </div>
  );
}
