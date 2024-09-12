"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TestimonialImage from "../../../../public/images/testimonial.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const testimonials = [
  {
    name: "Mike Taylor",
    location: "Lahore, Pakistan 1",
    image: TestimonialImage,
    quote:
      "Movemint is amazing, and I'm very happy I got connected with them to help facilitate my move in an easy and straightforward fashion.",
  },
  {
    name: "Chris Thomas",
    location: "CEO of Red Button 2",
    image: TestimonialImage,
    quote:
      "Movemint provided excellent service and made my move stress-free and efficient. Highly recommend!",
  },
  {
    name: "Chris Thomas",
    location: "Lahore, Pakistan 3",
    image: TestimonialImage,
    quote:
      "Movemint provided excellent service and made my move stress-free and efficient. Highly recommend!",
  },
  {
    name: "Chris Thomas",
    location: "CEO of Red Button 4",
    image: TestimonialImage,
    quote:
      "Movemint provided excellent service and made my move stress-free and efficient. Highly recommend!",
  },
  {
    name: "Chris Thomas",
    location: "Lahore, Pakistan 5",
    image: TestimonialImage,
    quote:
      "Movemint provided excellent service and made my move stress-free and efficient. Highly recommend!",
  },
  {
    name: "Chris Thomas",
    location: "CEO of Red Button 6",
    image: TestimonialImage,
    quote:
      "Movemint provided excellent service and made my move stress-free and efficient. Highly recommend!",
  },
];

const Card = ({ image, name, location, quote, className }) => {
  return (
    <div
      className={cn(
        "relative bg-white p-6 rounded-lg shadow-lg mb-4 flex flex-col items-start",
        className
      )}
    >
      <div className="absolute -top-3 -left-8 z-30">
        <Image
          src={image}
          alt={name}
          width={50}
          height={50}
          className="w-16 h-16 rounded-full border-4 border-white"
        />
      </div>
      <div className="mt-8">
        <p className="text-gray-700 mb-4">{quote}</p>
        <p className="text-lg font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

const Dot = ({ isActive }) => (
  <div
    className={`w-3 h-3 rounded-full mx-1 ${
      isActive ? "bg-blue-500" : "bg-gray-300"
    }`}
  />
);

const Testimonial = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    setActiveDot(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setActiveDot(api.selectedScrollSnap());
    });
  }, [api]);

  const handleNext = () => {
    if (api) {
      api.scrollNext();
      setCurrent(api.selectedScrollSnap() + 1);
    }
  };

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev();
      setCurrent(api.selectedScrollSnap() - 1);
    }
  };

  // const nextIndex = current % testimonials.length;
  const nextTestimonialIndex =
    ((current % testimonials.length) + 1) % testimonials.length;

  return (
    <div className="m-20 mb-0 z-10 mx-auto text-center w-full px-10">
      <div className="lg:grid space-y-4 grid-cols-12 gap-8">
        <div className="md:col-span-7 xl:col-span-7 text-start">
          <h1 className="text-2xl font-semibold uppercase">Testimonials</h1>
          <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient">
            Why our customers love movemint.
          </h4>
          <div className="flex justify-start mt-4">
            {testimonials.map((_, index) => (
              <Dot key={index} isActive={index === activeDot} />
            ))}
          </div>
        </div>
        <div className="md:col-span-5 xl:col-span-5 flex flex-col items-center gap-4 relative">
          <div className="relative w-fit">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              orientation="vertical"
              className="w-full max-w-xl"
              setApi={setApi}
            >
              <CarouselContent className="-mt-1 max-h-[350px] sm:max-h-[300px]">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className={cn("pt-1 md:basis-1/2")}>
                    <div className="p-8">
                      <div className="relative">
                        <Card
                          image={testimonial.image}
                          name={testimonial.name}
                          location={testimonial.location}
                          quote={testimonial.quote}
                          className={cn(
                            "z-5",
                            current === index + 1 && "active"
                          )}
                        />
                        {index === current - 1 && (
                          <Card
                            image={testimonials[nextTestimonialIndex].image}
                            name={testimonials[nextTestimonialIndex].name}
                            location={
                              testimonials[nextTestimonialIndex].location
                            }
                            quote={testimonials[nextTestimonialIndex].quote}
                            className="w-full absolute left-8 -bottom-16 bg-transparent border z-[-1]"
                          />
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex flex-col justify-center absolute -right-8 top-24 z-30">
              <ChevronUpIcon
                className="cursor-pointer"
                onClick={handlePrevious}
              />
              <ChevronDownIcon
                className="cursor-pointer"
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
