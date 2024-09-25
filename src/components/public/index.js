import React from "react";
import GetStarted from "./components/forms/get-started";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-0">
        <div className="w-[638px] h-[661px] bg-primary blur-[200px] absolute top-[80px] -left-[55%] 4xl:-left-[25%] hidden lg:block"></div>

        <div className={` container max-w-[1242px] w-full`}>
          <h1 className="text-white font-bold my-6 sm:m-0 lg:text-7xl lg:leading-[75px] text-4xl leading-[41px] text-center">
            Moving People and Making The World A Smaller Place.
          </h1>
          <p className={`mt-[15px] mb-6 text-white font-medium text-[27px]`}>
            Let’s get to your next home.
          </p>
          <GetStarted />
          <p className="mt-3 text-white text-base sm:text-xl leading-[25px] font-semibold">
            Join Movemint and simplify your move. Transitions can be hard, but
            Movemint makes finding the right mover easy.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
