"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Hero() {


  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                <div className="relative h-full">
                  <div className="absolute inset-0">
                    <Image
                      alt="Barber 1"
                      src="/barber.jpeg"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                  </div>
                </div>
                <div className="relative h-full">
              
                </div>
             
              
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Find & Book <span className="text-primary">Appointment</span>{" "}
                with your Fav
                <span className="text-primary"> Saloon </span>
              </h2>

              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
                qui hic atque tenetur quis eius quos ea neque sunt, accusantium
                soluta minus veniam tempora deserunt? Molestiae eius quidem quam
                repellat.
              </p>

              <Button className="mt-10">Explore Now</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
