"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";

const TestimonialSlider = () => {
  const imageArray = [
    "/images/slider.png",
    "/images/sliderTwo.png",
    "/images/sliderFour.png",
    "/images/slider.png",
    "/images/sliderTwo.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    dots: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: { slidesToShow: 5, slidesToScroll: 1 },
      },
      {
        breakpoint: 1000,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 650,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 450,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="p-16">
      <Slider {...settings}>
        {imageArray.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[215px] h-[120px] flex items-center justify-center gap-6"
            >
              <Image
                width={100}
                height={100}
                src={item}
                alt="Image"
                className="w-full h-full object-contain"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
