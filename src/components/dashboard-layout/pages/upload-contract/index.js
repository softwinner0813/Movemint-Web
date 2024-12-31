"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UploadContract = () => {
  const router = useRouter()
  const handleClick = () => {
    window.open('/contract-preparation', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-4 md:p-8">
      <h4 className="text-2xl font-bold text-start w-full">
        Client Information
      </h4>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mt-2">
          <div className="flex gap-3 md:items-center justify-start cursor-pointer">
            <Image
              width={100}
              height={100}
              src={"/images/edit-product.png"}
              alt="Edit Profile"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold">John Doe</span>
              <span className="text-sm font-normal">
                Location: Los Angeles, California
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-4 md:mt-0">
            <span className="text-lg md:text-2xl font-bold">
              Requested Date: 02/22/2022
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[850px]">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Origin Information</h3>
            <p className="text-sm font-normal">
              123 Happy Street Los Angeles, CA 90292 United States
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Additional Stop Information</h3>
            <p className="text-sm font-normal">
              123 Happy Street Los Angeles, CA 90292 United States
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Destination</h3>
            <p className="text-sm font-normal">
              123 Happy Street Los Angeles, CA 90292 United States
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Move Details</h3>
          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm font-bold border-b border-white w-max">
              Home Details (House)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[850px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Bedrooms -<span className="font-bold"> 5 beds</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  SQFT -<span className="font-bold"> 2,093</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Floors -<span className="font-bold"> 2</span>{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm font-bold border-b border-white w-max">
              Vehicle Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[850px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Vehicle Transport -<span className="font-bold"> Yes</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Vehicle Make -<span className="font-bold"> Hyundai</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Vehicle Model -<span className="font-bold"> Sonata</span>{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm font-bold border-b border-white w-max">
              Storage Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-[850px]">
              <div className="col-span-4 flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Storage Needed -<span className="font-bold"> Yes</span>{" "}
                </h3>
              </div>
              <div className="col-span-8 flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Length of Storage -
                  <span className="font-bold"> 02/22/2022 - 02/22/2022</span>{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm font-bold border-b border-white w-max">
              Packing Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[850px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Packing Needed -<span className="font-bold"> Yes</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Type of Packing -
                  <span className="font-bold">Full Packing</span>{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm font-bold border-b border-white w-max">
              Additional Information
            </h3>
            <div>
              <p className="text-sm font-normal">
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using
                &apos;Content here, content here&apos;, making it look like
                readable English. Many desktop publishing packages and web page
                editors now use Lorem Ipsum as their default. Contrary to
                popular belief, Lorem Ipsum is not simply random text &mdash; it
                is the model text for your company.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">Proposal Status</h3>
          <span className="text-success bg-green-950 text-xs font-semibold max-w-max rounded-sm p-3">
            Accepted
          </span>
          <p className="text-xs font-semibold">
            You can now attach a contract to continue with sending an invoice to
            your customer.
          </p>
        </div>
      </div>
      <div className="flex justify-start mt-10">
        <Button className="w-full md:w-56 rounded-md" onClick={handleClick}>
          Create Contract
        </Button>
      </div>
    </div>
  );
};

export default UploadContract;
