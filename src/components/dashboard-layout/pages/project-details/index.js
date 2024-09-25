"use client";
import Image from "next/image";
import EditProductInformation from "../../../../../public/images/edit-product.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquareMore } from "lucide-react";
import { formatDateTime } from "@/lib/chatDate";
import { getName, getMake, getModel, isVehicle } from "@/lib/utils";
import { useEffect } from "react";


const EditProjectDetails = ({ data, submittedProposal }) => {
  const router = useRouter();

  const handleProposalSubmit = () => {
    router.push(`/dashboard/projects/${data.id}/submit-proposal`);
  };

  const handleProposalEdit = () => {
    router.push(`/dashboard/projects/${data.id}/edit-proposal`);
  };

  const handleMessage = () => {
    router.push(`/dashboard/messaging`);
  };

  const LocationInfo = (address) => {
    const { streetAddress, addressLine2, city, state, zip, country } = JSON.parse(address.address);

    // Map country code to full country name, you can expand this as needed
    const countryName = country === "US" ? "United States" : country;

    return (
      <div style={{ textAlign: 'left' }}>
        <p>{streetAddress}</p>
        {addressLine2 && <p>{addressLine2}</p>} {/* Render addressLine2 only if it's not null */}
        <p>{`${city}, ${state} ${zip}`}</p>
        <p>{countryName}</p>
      </div>
    );
  };


  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between gap-4 mb-4">
        <h4 className="text-2xl font-bold text-start w-full">
          Client Information
        </h4>
        <Select>
          <SelectTrigger className="w-[180px] text-white/70">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'Scheduled to be picked up'}>Scheduled to be picked up</SelectItem>
            <SelectItem value={'Picked Up'}>Picked Up</SelectItem>
            <SelectItem value={'In Transit'}>In Transit</SelectItem>
            <SelectItem value={'In Holding'}>In Holding</SelectItem>
            <SelectItem value={'Delivered'}>Delivered</SelectItem>
            <SelectItem value={'Completed'}>Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mt-2 gap-5">
          <div className="flex gap-3 items-center justify-start cursor-pointer">
            <Image
              src={data.avatar ?? EditProductInformation}
              alt="Edit Profile"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold">{getName(data.first_name, data.last_name)}</span>
              <span className="text-sm font-normal">
                Location: {(JSON.parse(data.from)).city + ", " + (JSON.parse(data.from)).country}
              </span>
            </div>
            <Button
              variant="outline"
              className="w-fit p-2 rounded-md border-none bg-[#222] hover:bg-[#333]"
              onClick={handleMessage}
            >
              <MessageSquareMore className="translate-y-px" />
            </Button>
          </div>
          <div className="flex flex-col mt-4 md:mt-0">
            <span className="text-lg md:text-2xl font-bold">
              Requested Date: {data.move_date}
            </span>
            <span
              className="text-base md:text-lg font-normal"
              style={{
                background:
                  "linear-gradient(103.25deg, #0D70BC 28.93%, #88E2E8 98.76%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              View Survey Results
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[850px]">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Origin Information</h3>
            <p className="text-sm font-normal">
              <LocationInfo address={data.from} />
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Additional Stop Information</h3>
            <p className="text-sm font-normal">
              {(JSON.parse(data.extra_stops)).length != 0 && <LocationInfo address={data.extra_stops} />}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Destination</h3>
            <p className="text-sm font-normal">
              <LocationInfo address={data.destination} />
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Move Details</h3>
          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm font-bold border-b border-white w-max">
              Home Details ({data.residence_type})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[850px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Bedrooms -<span className="font-bold"> {data.bedrooms} beds</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  SQFT -<span className="font-bold"> {data.sqft}</span>{" "}
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
                  Vehicle Transport -<span className="font-bold"> {isVehicle(data.vehicles)}</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Vehicle Make -<span className="font-bold"> {getMake(data.vehicles)}</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Vehicle Model -<span className="font-bold"> {getModel(data.vehicles)}</span>{" "}
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
                  Storage Needed -<span className="font-bold"> {data.storage_start == null ? "No" : "Yes"}</span>{" "}
                </h3>
              </div>
              <div className="col-span-8 flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Length of Storage -
                  <span className="font-bold"> {formatDateTime(data.storage_start)} {formatDateTime(data.storage_end)}</span>{" "}
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
                  Packing Needed -<span className="font-bold"> {data.packing_service == null ? "No" : "Yes"}</span>{" "}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-normal">
                  Type of Packing -
                  <span className="font-bold">{data.packing_service == 0 ? "Full-Packing" : data.packing_service == 1 ? "Part-Packing" : "No Packing"}</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm font-bold border-b border-white w-max">
              Additional Information
            </h3>
            <div className="space-y-3">
              <p className="text-sm font-normal">
                {data.note}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-10">
        <Button
          className={`w-full md:w-56 rounded-md ${submittedProposal.result ? 'invisible' : 'visible'}`}
          onClick={handleProposalSubmit}
        >
          Submit Proposal
        </Button>
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col justify-center gap-4 md:flex-row md:gap-28 w-full">
          <Button
            className={`w-full md:w-56 rounded-md ${submittedProposal.result ? 'visible' : 'invisible'}`}
            onClick={handleProposalEdit}
          >
            Edit Proposal
          </Button>
          <Button
            variant="danger"
            className={`w-full md:w-56 rounded-md bg-danger-300 ${submittedProposal.result ? 'visible' : 'invisible'}`}
          >
            Withdraw Proposal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectDetails;
