"use client";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { CameraIcon, Minus, Upload } from "lucide-react";
import { useState } from "react";

const EditProfileForm = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedBanner, setSelectedBanner] = useState("");

  async function handleImageUpload(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      await reader.readAsDataURL(file);
    }
  }

  async function handleUploadBanner(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedBanner(reader.result);
      };
      await reader.readAsDataURL(file);
    }
  }

  return (
    <form className="w-full flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col gap-5">
        {/* Upload Image */}
        <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
          <label
            name="uploadImage"
            htmlFor="uploadImage"
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            {selectedImage ? (
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Uploaded Avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="w-[80px] h-[80px] bg-[#ECECEE] rounded-full flex items-center justify-center">
                <CameraIcon size={40} color="black" />
              </div>
            )}
            <p className="text-[14px] text-primary">Upload Avatar</p>
          </label>
          <input
            type="file"
            accept="image/*"
            id="uploadImage"
            name="uploadImage"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        {/* Upload Banner */}
        <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
          <label
            htmlFor="uploadBanner"
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <div
              className={`w-[300px] sm:w-[400px] md:w-[512px] md:h-[200px] rounded-xl overflow-hidden flex items-center justify-center ${
                selectedBanner ? "" : "border-2 border-white border-dashed"
              }`}
            >
              {selectedBanner ? (
                <Image
                  className="w-full h-full object-cover"
                  src={selectedBanner}
                  alt="Uploaded Banner"
                  width={512}
                  height={200}
                />
              ) : (
                <p className="w-full h-full flex flex-col items-center justify-center gap-2 text-center text-base md:text-[20px] p-4">
                  <Upload color="white" size={40} />
                  Please upload a custom banner for your profile.
                </p>
              )}
            </div>
            <div className="w-full relative text-[14px] font-semibold text-primary flex justify-center">
              <p className="relative top-1 mt-2 md:mt-0"> Upload Banner</p>
              <p className="text-foreground text-[10px] absolute right-0">
                (Recommended size of 512 x 256px)
              </p>
            </div>
          </label>
          <input
            type="file"
            accept="image/*"
            id="uploadBanner"
            name="uploadBanner"
            className="hidden"
            onChange={handleUploadBanner}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <h4 className="text-2xl font-bold text-start w-full">
          Personal Details
        </h4>
        <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 items-center justify-center">
          <InputWithLabel type="text" label="First Name" className="flex-1" />
          <InputWithLabel type="text" label="Last Name" className="flex-1" />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 justify-center">
          <div className="w-full sm:w-1/2">
            <InputWithLabel type="email" label="Email" className="w-full" />
          </div>
          <div className="w-full sm:w-1/2">
            <InputWithLabel
              type="tel"
              label="Phone Number"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <h4 className="text-2xl font-bold text-start w-full">
          Company Details
        </h4>
        <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 items-center justify-center">
          <InputWithLabel type="text" label="Company Name" className="flex-1" />
          <InputWithLabel
            type="text"
            label="Company Headquarters"
            className="flex-1"
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 justify-center">
          <div className="w-full sm:w-1/2">
            <InputWithLabel
              type="email"
              label="Company Email"
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <InputWithLabel
              type="tel"
              label="Company Number"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full md:pr-10">
          <InputWithLabel
            type="text"
            label="Number Of Employees"
            className="w-full sm:w-1/2"
          />
        </div>
        <div className="w-full md:pr-10">
          <InputWithLabel
            type="text"
            label="Company Bio (Max 256 words)"
            className="w-full sm:w-1/2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="font-bold">Do you ship internationally?</Label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600 h-5 w-5"
                name="shipping"
                value="yes"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600 h-5 w-5"
                name="shipping"
                value="no"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <h4 className="text-2xl font-bold text-start w-full">Locations</h4>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative border-2 border-white max-w-full sm:max-w-56 p-5 rounded-[10px]">
            <h4 className="text-lg font-bold">Los Angeles #9329</h4>
            <p className="max-w-full sm:max-w-32 text-xs mt-1">
              123 Prosperity Street, Los Angeles, CA 90292 United States
            </p>
            <div className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-black text-xl leading-none">
                <Minus size={18} />
              </span>
            </div>
          </div>
          <div className="relative border-2 border-white max-w-full sm:max-w-56 p-5 rounded-[10px]">
            <h4 className="text-lg font-bold">Los Angeles #9329</h4>
            <p className="max-w-full sm:max-w-32 text-xs mt-1">
              123 Prosperity Street, Los Angeles, CA 90292 United States
            </p>
            <div className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-black text-xl leading-none">
                <Minus size={18} />
              </span>
            </div>
          </div>
          <div className="relative border-2 border-white max-w-full sm:max-w-56 p-5 rounded-[10px]">
            <h4 className="text-lg font-bold">Los Angeles #9329</h4>
            <p className="max-w-full sm:max-w-32 text-xs mt-1">
              123 Prosperity Street, Los Angeles, CA 90292 United States
            </p>
            <div className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-black text-xl leading-none">
                <Minus size={18} />
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mt-4 md:pr-10">
          <InputWithLabel
            type="text"
            label="Location name"
            className="w-full sm:w-1/2"
          />
        </div>
        <div className="w-full md:pr-10">
          <InputWithLabel
            type="text"
            label="Location Address"
            className="w-full sm:w-1/2"
          />
        </div>
        <Button className="w-full sm:w-[175px] sm:ml-[189px] py-1 px-1 rounded-lg">
          Add Location
        </Button>
      </div>
      <Button className="w-56 rounded-lg mt-5">Save Changes</Button>
    </form>
  );
};

export default EditProfileForm;
