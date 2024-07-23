"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import Link from "next/link";

export default function Shop({ heading, shops = [] }) {
  return (
    <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
      <h1 className="mb-10 items-center flex flex-col font-bold text-4xl tracking-wide">
        {heading || "Popular Shops"}
      </h1>
      {shops.length > 0 && (
        <div className="flex flex-wrap gap-8 ml-2">
          {shops.map((shop, index) => (
            <div key={index} className="p-4 md:p-0 w-80">
              <section className="p-4 py-8 bg-purple-50 text-center transform duration-500 hover:scale-105 hover:shadow-lg cursor-pointer transition-all">
                {shop.publicURL && (
                  <Image
                    src={shop.publicURL}
                    width={300}
                    height={300}
                    className="rounded-3xl transition-transform duration-300 ease-in-out hover:scale-110"
                    alt=""
                  />
                )}
                <div className="flex justify-center mt-6 space-x-1">
                  <svg
                    className="w-4 h-4 fill-current text-orange-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                  >
                    <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current text-orange-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                  >
                    <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current text-orange-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                  >
                    <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                  >
                    <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                  </svg>
                </div>
                <Link href={"/detail/shop/" + shop.Name + "-" + shop.ShopId}>
                  <h1 className="text-2xl my-4 transition-transform duration-300 hover:scale-105 hover:text-primary">
                    {shop.Name}
                  </h1>
                </Link>
                <p className="mb-4 text-sm text-gray-600 transition-colors duration-300 hover:text-gray-900">
                  {shop.Address}
                </p>
                <Button className="p-2 px-4 border border-primary bg-white text-primary rounded-full w-full text-center text-sm mt-2 cursor-pointer transition-transform duration-300 ease-in-out hover:bg-primary hover:text-white hover:scale-105">
                  Book Now
                </Button>
              </section>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
