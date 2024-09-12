import Image from "next/image";
import React from "react";
import SubscribeBg from "../../../../public/images/subscribe-img.png";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import NavigationIcon from "@/components/icons/navigation-second-icon";
import SubscriberPattern from "@/components/icons/subscribe-pattern";

const Subscribe = () => {
  return (
    <div className="mb-10 relative z-10 mx-auto text-center w-full max-w-[1250px] px-10">
      <div className="hidden sm:block w-full">
        <Image
          src={SubscribeBg}
          alt="SubscribeImage"
          width={1200}
          height={541}
          className="w-full"
        />
      </div>
      <div className="sm:absolute sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] pb-[18px] md:pb-9 px-4 md:px-8 pt-[12px] md:pt-5 flex flex-col gap-6">
        <h6 className="text-[16px] md:text-[24px] font-bold text-foreground">
          Subscribe to get information, latest news and other interesting offers
          about Movemint.
        </h6>
        <div className="flex justify-center items-center md:p-5 sm:p-0 gap-8">
          <div className="flex items-center justify-center gap-3 bg-foreground px-5 py-[14px] rounded-lg">
            <Mail color="#84829a" size={16} />
            <input
              type="text"
              className="w-[120px] sm:w-[200px] md:w-[300px] bg-foreground text-background focus:outline-none placeholder:text-xs"
              placeholder="Your Email"
            />
          </div>
          <div className="">
            <Button className="rounded-xl h-[52px]">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="hidden sm:block absolute -top-7 right-5">
        <Button className="w-fit text-xl rounded-full">
          <NavigationIcon />
        </Button>
      </div>
      <div className="hidden xl:block absolute -bottom-[80px] -right-[80px]">
        <SubscriberPattern />
      </div>
    </div>
  );
};

export default Subscribe;
