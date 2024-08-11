"use client";
import React, { useContext } from "react";
import Addemployee from "./_component/Addemployee";
import { AuthenticationContext } from "@/app/context/authentication";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const { isValid } = useContext(AuthenticationContext);

  if (!isValid) {
    router.push("/logIn");
    return null;
  }
  return (
    <div>
      <Addemployee />
    </div>
  );
}
