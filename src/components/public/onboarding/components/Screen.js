import Image from "next/image";
import React from "react";

const Screen = ({
  imageSrc,
  title,
  subtitle,
  description,
  steps,
  logo,
}) => {
  return (
    <div className="">
      <Image
        src={imageSrc}
        alt="OnboardingImage"
        width={962}
        height={530}
        className="w-full h-auto rounded-t-[33px]"
      />
      <div className="pb-[18px] md:pb-9 px-4 md:px-8 pt-[12px] md:pt-5">
        <h6 className="text-[24px] md:text-[32px] font-bold text-primary h-[38px] flex justify-center items-center">
          {title}
        </h6>
        {logo && (
          <Image
            src={logo}
            alt="Movemint Logo"
            width={256}
            height={40}
            className="w-24 md:w-36 lg:w-48 xl:w-72 mx-auto mt-1"
          />
        )}
        {subtitle && (
          <p className="font-bold text-white mt-[14px] text-sm md:text-base">
            {subtitle}
          </p>
        )}
        {steps && (
          <ol className="list-decimal font-bold text-white pl-6 flex flex-col items-center space-y-2 text-sm md:text-base">
            {steps.map((step, index) => (
              <li key={index} className="w-fit">
                {step}
              </li>
            ))}
          </ol>
        )}
        {description && (
          <p className="font-normal text-white mt-5 mx-auto max-w-[804px] text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Screen;
