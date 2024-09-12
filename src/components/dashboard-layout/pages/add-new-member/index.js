"use client";
import CameraIcon from "@/components/icons/camera-icon";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";

const AddNewMemberForm = ({ editMode }) => {
  return (
    <form className="w-full md:w-[790px] flex flex-col items-center justify-center gap-14">
      {/* Upload Photo */}
      <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
        <div className="w-[80px] h-[80px] bg-[#ECECEE] rounded-full flex items-center justify-center">
          <CameraIcon />
        </div>
        <p className="text-[14px] text-primary">Upload Photo</p>
      </div>
      {/* Input Fields */}
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 items-center justify-center">
          <InputWithLabel type="text" label="First Name" className="flex-1" />
          <InputWithLabel type="text" label="Last Name" className="flex-1" />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 justify-center">
          <div className="w-full sm:w-1/2">
            <InputWithLabel type="email" label="Email" className="w-full" />
            <p className="w-full text-[10px]">
              (Your teammate will receive an invite link to join Movemint)
            </p>
          </div>
          <div className="w-full sm:w-1/2">
            <InputWithLabel
              type="tel"
              label="Phone Number"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full md:pr-10">
          <InputWithLabel
            type="text"
            label="Job Title"
            className="w-full sm:w-1/2"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        {editMode ? (
          <>
            <Button type="button" className="w-56 rounded-md">
              Save Change
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-56 rounded-md bg-[#FF0000]"
            >
              Delete Member
            </Button>
          </>
        ) : (
          <Button type="button" className="w-56 rounded-md">
            Save Change
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddNewMemberForm;
