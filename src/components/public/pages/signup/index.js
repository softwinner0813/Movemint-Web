import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import Image from "next/image";
import CaptchaImg from "../../../../../public/images/recaptcha-logo.png";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Signup = () => {
  return (
    <div className="py-8 max-w-5xl mx-auto w-full shadow-lg rounded-lg">
      <h1 className="text-4xl lg:text-5xl xl:text-6xl text-foreground font-bold mb-6">
        Let&apos;s Get Started
      </h1>
      <p className="mb-6 text-foreground md:text-lg lg:text-2xl">
        Our support team will use these details to contact you.
      </p>
      <form>
        <div className="mb-4">
          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
            Basic Information:
          </h2>

          <InputWithLabel id="firstName" type="text" label="First Name" />
          <InputWithLabel id="lastName" type="text" label="Last Name" />
          <InputWithLabel id="email" type="email" label="Email Address" />
          <InputWithLabel id="phoneNumber" type="number" label="Phone Number" />
        </div>
        <div className="mb-4">
          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
            Company Details:
          </h2>

          <div className="grid w-full items-center gap-1.5 mb-3">
            <Label className="font-bold">What type of moves do you service?</Label>
            <RadioGroup defaultValue="interstate" className="flex items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="interstate" id="interstate" />
                <Label htmlFor="interstate">Interstate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="international" id="international" />
                <Label htmlFor="international">International</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Both</Label>
              </div>
            </RadioGroup>
          </div>

          <InputWithLabel
            id="officeLocation"
            type="text"
            label="Office Location"
          />
          <InputWithLabel
            id="additionalLocation"
            type="text"
            label="Additional Office Locations"
          />
          <Button type="button"> Add Additional Location</Button>
        </div>
        <div className="mb-4">
          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
            Business Information:
          </h2>

          <InputWithLabel
            id="businessLicenseNumber"
            type="number"
            label="Business License Number"
          />
          <InputWithLabel
            id="einNumber"
            type="number"
            label="Tax Identification Number (EIN)"
          />
          <InputWithLabel
            id="yearsBusiness"
            type="number"
            label="Years in Business"
          />
          <InputWithLabel
            id="numberOfEmployees"
            type="number"
            label="Number of Employees"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
            Legal Information:
          </h2>
          <div className="mb-6 py-4 px-5 border border-foreground rounded-md">
            <h3 className="text-md md:text-lg lg:text-2xl font-semibold mb-6 text-foreground">
              Terms & Conditions:
            </h3>
            <div className="space-y-4">
              <p className="text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur facilisis, nisl nunc tincidunt
                justo, id tincidunt libero augue non nulla. Praesent vestibulum
                tincidunt tellus, nec luctus sapien convallis ac. Fusce non
                felis at quam dignissim gravida. Quisque aliquet justo at magna
                interdum, vel convallis lacus commodo. Curabitur et metus eget
                nisl mollis facilisis. Nulla facilisi. Proin nec urna id metus
                luctus vestibulum a id libero. Morbi nec ex non quam laoreet
                aliquet. Duis gravida magna in libero cursus, non elementum
                lacus tempor.
              </p>
              <p className="text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur facilisis, nisl nunc tincidunt
                justo, id tincidunt libero augue non nulla. Praesent vestibulum
                tincidunt tellus, nec luctus sapien convallis ac. Fusce non
                felis at quam dignissim gravida. Quisque aliquet justo at magna
                interdum, vel convallis lacus commodo. Curabitur et metus eget
                nisl mollis facilisis. Nulla facilisi. Proin nec urna id metus
                luctus vestibulum a id libero. Morbi nec ex non quam laoreet
                aliquet. Duis gravida magna in libero cursus, non elementum
                lacus tempor.
              </p>
              <p className="text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur facilisis, nisl nunc tincidunt
                justo, id tincidunt libero augue non nulla. Praesent vestibulum
                tincidunt tellus, nec luctus sapien convallis ac. Fusce non
                felis at quam dignissim gravida. Quisque aliquet justo at magna
                interdum, vel convallis lacus commodo. Curabitur et metus eget
                nisl mollis facilisis. Nulla facilisi. Proin nec urna id metus
                luctus vestibulum a id libero. Morbi nec ex non quam laoreet
                aliquet. Duis gravida magna in libero cursus, non elementum
                lacus tempor.
              </p>
            </div>
          </div>
          <div className="mb-6 py-4 px-5 border border-foreground rounded-md">
            <h3 className="text-md md:text-lg lg:text-2xl font-semibold mb-6 text-foreground">
              Privacy Policy:
            </h3>
            <div className="space-y-4">
              <p className="text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur facilisis, nisl nunc tincidunt
                justo, id tincidunt libero augue non nulla. Praesent vestibulum
                tincidunt tellus, nec luctus sapien convallis ac. Fusce non
                felis at quam dignissim gravida. Quisque aliquet justo at magna
                interdum, vel convallis lacus commodo. Curabitur et metus eget
                nisl mollis facilisis. Nulla facilisi. Proin nec urna id metus
                luctus vestibulum a id libero. Morbi nec ex non quam laoreet
                aliquet. Duis gravida magna in libero cursus, non elementum
                lacus tempor.
              </p>
              <p className="text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur facilisis, nisl nunc tincidunt
                justo, id tincidunt libero augue non nulla. Praesent vestibulum
                tincidunt tellus, nec luctus sapien convallis ac. Fusce non
                felis at quam dignissim gravida. Quisque aliquet justo at magna
                interdum, vel convallis lacus commodo. Curabitur et metus eget
                nisl mollis facilisis. Nulla facilisi. Proin nec urna id metus
                luctus vestibulum a id libero. Morbi nec ex non quam laoreet
                aliquet. Duis gravida magna in libero cursus, non elementum
                lacus tempor.
              </p>
              <p className="text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur facilisis, nisl nunc tincidunt
                justo, id tincidunt libero augue non nulla. Praesent vestibulum
                tincidunt tellus, nec luctus sapien convallis ac. Fusce non
                felis at quam dignissim gravida. Quisque aliquet justo at magna
                interdum, vel convallis lacus commodo. Curabitur et metus eget
                nisl mollis facilisis. Nulla facilisi. Proin nec urna id metus
                luctus vestibulum a id libero. Morbi nec ex non quam laoreet
                aliquet. Duis gravida magna in libero cursus, non elementum
                lacus tempor.
              </p>
            </div>
          </div>

          <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions listed above.
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="privacy" />
              <label
                htmlFor="privacy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the privacy policy listed above.
              </label>
            </div>
          </div>

          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
            Verification and Security:
          </h2>
          <div className="mb-6 max-w-[430px]">
            <div className="bg-foreground rounded-md text-center flex justify-between">
              <div className="flex items-center space-x-2 p-6 ">
                <Checkbox
                  id="verify"
                  iconClassName="h-6 w-6"
                  className="!border-gray h-12 w-12 rounded-lg"
                />
                <label
                  htmlFor="verify"
                  className="!text-black text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Click to Verify
                </label>
              </div>
              <div className="p-6 bg-gray-dark">
                <Image
                  src={CaptchaImg}
                  alt="recaptcha"
                  height={64}
                  width={64}
                />
              </div>
            </div>
          </div>

          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
            Submission:
          </h2>

          <Link href={"/onboarding"}>
            <Button
              variant="destructive"
              type="submit"
              className="h-24 text-xl md:text-2xl lg:text-3xl py-4 md:py-5 lg:py-7"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
