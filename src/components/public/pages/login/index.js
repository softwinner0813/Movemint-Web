import Image from "next/image";
import React from "react";
import Input from "../../components/input";
import Link from "next/link";
import AppleIcon from "@/components/icons/apple-icon";
import GoogleIcon from "@/components/icons/google-icon";
import Logo from "../../../../../public/images/logo/logo.png";
import { Button } from "@/components/ui/button";
import GooglePlayIcon from "@/components/icons/goole-play-icon";
import AppleStoreIcon from "@/components/icons/apple-store-icon";

const LoginPage = () => {
  return (
    <div className="relative z-10 w-full max-w-80 mx-auto space-y-6 text-center pt-8 pb-32">
      <Image
        src={Logo}
        alt="Movemint Logo"
        width={256}
        height={40}
        className="w-36 lg:w-48 xl:w-72 mx-auto"
      />
      <p className="text-center text-sm text-foreground font-bold">
        Please sign-in as a service provider
      </p>
      <form className="space-y-4">
        <Input type="email" placeholder="support@international.com" />
        <Input type="password" placeholder="********" />

        <Link href={'/onboarding'} className="block">
          <Button variant="default" type="button">
            {" "}
            Sign in with email
          </Button>
        </Link>
      </form>
      <div className="text-center text-sm text-foreground">
        Or if you don&apos;t have an account,{" "}
        <Link href="/signup" className="text-foreground">
          click here to create one
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <p className="text-xs text-foreground">- Or sign in using -</p>
      </div>
      <div className="flex flex-col space-y-4">
        <button className="w-full  px-7 py-3 flex items-center justify-center space-x-2 bg-black text-foreground rounded-lg">
          <AppleIcon />
          <span className="text-base font-medium">Continue with Apple</span>
        </button>
        <button className="w-full py-2 flex items-center justify-center space-x-2 bg-foreground rounded-lg">
          <GoogleIcon />
          <span className="text-black/50 font-medium">
            Continue with Google
          </span>
        </button>
      </div>
      <div className="text-center text-sm text-foreground mt-4">
        <span className="font-bold "> For Consumers:</span> <br /> Please
        download the app to continue:
      </div>
      <div className="flex space-x-4 justify-center lg:justify-start">
        <GooglePlayIcon />
        <AppleStoreIcon />
      </div>
    </div>
  );
};

export default LoginPage;
