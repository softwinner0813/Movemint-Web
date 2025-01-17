"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Screen from "./components/Screen";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase";
import { useUser } from "@/lib/userContext";

const screens = [
  {
    imageSrc: "/images/onboarding/onboarding-one.png",
    logo: "/images/logo/logo.png",
    title: "Welcome To",
    subtitle: "Connecting You with Ready-to-Move Customers",
    description:
      "Movemint connects you with customers who have already completed their moving surveys. Submit estimates on ready-to-go moving opportunities and grow your business with ease.",
  },
  {
    imageSrc: "/images/onboarding/onboarding-two.png",
    title: "How Movemint Works",
    subtitle: "Simple, Efficient, and Effective",
    steps: [
      "Create your profile and list your service areas.",
      "Receive and review moving requests.",
      "Submit competitive quotes to win more projects.",
    ],
    description:
      "Movemint streamlines your workflow and helps you grow your business.",
  },
  {
    imageSrc: "/images/onboarding/onboarding-three.png",
    title: "Get Started",
    subtitle: "Join the Movemint Network",
    description:
      "Create your account now to submit estimates on ready-to-go moving opportunities. With pre-completed surveys and a steady stream of customers, grow your business effortlessly.",
  },
];

const OnboardingPage = () => {
  const [api, setApi] = useState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useUser();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (!isAuthenticated || !user) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    });

    if (!api) {
      return;
    }

    return () => {
      unsubscribe();
    };
  }, [api, isLoading]);

  const handleNext = () => {
    if (api) {
      setPage(page + 1);
      if (page === 2) {
        router.push("/dashboard");
      }
      else {
        api.scrollNext();
      }
    }
  };

  const handlePrevious = () => {
    router.push("/dashboard");
  };

  return (
     ! isLoading && <div className="pt-10 login-bg place-content-center">
      <div
        className="relative z-10 mx-auto text-center w-full max-w-[936px] rounded-[33px]"
        style={{
          background:
            "linear-gradient(180deg, #0D70BC 0%, #02101B 77%, #000000 100%)",
        }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {screens.map((screen, index) => (
              <CarouselItem key={index}>
                <Screen
                  {...screen}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-[25px] max-w-56 mx-auto md:mt-[51px] pb-10 flex justify-center gap-4 md:gap-[22px]">
          <Button
            variant="ghost"
            className="bg-[#635E66] rounded-full"
            onClick={handlePrevious}
          >
            skip
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
