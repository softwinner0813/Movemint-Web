"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import MoverCard from "./moverCard";
import MoversPattern from "@/components/icons/movers-pattern";

const moversContent = {
  heading: "Featured Movers",
  subHeading: "Most Popular",
};

const movers = [
  {
    heading: "Atlas Van Lines",
    location: "Los Angeles, CA",
    image: "/images/movers/mover-1.png",
    rating: "4.5",
  },
  {
    heading: "International Van Lines",
    location: "Irvine, CA",
    image: "/images/movers/mover-2.png",
    rating: "4.5",
  },
  {
    heading: "JK Van Lines",
    location: "Los Angeles",
    image: "/images/movers/mover-3.png",
    rating: "4.5",
  },
];

const MoverPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent rendering on the server side to avoid hydration issues

  return (
    <div
      className="min-h-[auto] mt-10 lg:mt-20"
      style={{
        background:
          "linear-gradient(to bottom, #191A1F 0%, #000000 50%, #191A1F 100%)",
      }}
    >
      <div className="container">
        <div className="text-center mb-12">
          <p className="uppercase mb-5 font-semibold text-2xl">
            {moversContent.subHeading}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
            <h1
              style={{
                background:
                  "linear-gradient(103.25deg, #0D70BC 28.93%, #88E2E8 98.76%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
              className="font-bold 2xl:text-[67px] text-4xl sm:text-5xl capitalize text-center mx-auto"
            >
              {moversContent.heading}
            </h1>

            <Link href="/" className="text-[#48ADFB] font-bold text-xl">
              See All
            </Link>
          </div>
        </div>

        <div className="relative mt-16 flex">
          <div className="w-full grid place-content-center gap-8 md:grid-cols-2 lg:grid-cols-3 z-10">
            {movers.map((mover, index) => (
              <MoverCard key={index} {...mover} />
            ))}
          </div>
          <div className="relative -left-12 hidden 2xl:block">
            <MoversPattern />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoverPage;
