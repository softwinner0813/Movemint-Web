"use client";

import React, { useEffect, useState } from "react";
import StepCard from "./StepCard";
import Trip from "./trip";
import MapIcon from "@/components/icons/map-icon";
import CameraIcon from "@/components/icons/camera-icon";
import CheckIcon from "@/components/icons/check-icon";

const stepsContent = {
  title: "Book your next Move in 3 easy steps",
  subtitle: "Moving made simple",
};

const steps = [
  {
    heading: "Provide Move Details",
    description:
      "Enter your move details, including dates and the destination for your move.",
    icon: <MapIcon />,
    color: "#F0BB1F",
  },
  {
    heading: "Submit Your Move",
    description:
      "Easily create a virtual inventory and submit your details to receive estimates from top movers.",
    icon: <CameraIcon />,
    color: "#F15A2B",
  },
  {
    heading: "Choose Your Mover",
    description:
      "Review real-time estimates from trusted movers and book the best option for your needs.",
    icon: <CheckIcon />,
    color: "#006380",
  },
];

const StepsPage = () => {
  // Ensure the component is only rendered on the client side to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent rendering on the server side to avoid hydration issues

  return (
    <div
      className="mt-12 p-4 sm:p-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(25, 26, 31, 0.1) 0%, rgba(13, 112, 188, 0.1) 50.5%, rgba(25, 26, 31, 0.1) 100%)",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between 2xl:flex-row flex-col gap-14">
          <div className="max-w-[730px] w-full">
            <p className="uppercase mb-5 font-semibold text-2xl text-white text-center 2xl:text-start">
              {stepsContent.subtitle}
            </p>

            <h1 className="text-primary bg-clip-text font-bold text-3xl sm:text-5xl 2xl:text-[67px] capitalize text-center 2xl:text-start">
              {stepsContent.title}
            </h1>

            <div className="grid gap-[70px] mt-9">
              {steps.map((step, index) => (
                <StepCard key={index} {...step} />
              ))}
            </div>
          </div>

          <div className="2xl:block">
            {/* Ensure the Trip component handles client-side rendering properly */}
            <Trip />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsPage;
