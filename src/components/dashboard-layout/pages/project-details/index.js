"use client";
import Image from "next/image";
import DefaultAvatar from "../../../../../public/images/user.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MessageSquareMore } from "lucide-react";
import { formatDateTime } from "@/lib/chatDate";
import { getName, getMake, getModel, isVehicle } from "@/lib/utils";
import LoadingScreen from "@/components/ui/loadingScreen";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/userContext";


const EditProjectDetails = ({ data, submittedProposal }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    console.log('Data parameter has changed:', data);
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const handleClick = () => {
    window.open('/contract-preparation', '_blank', 'noopener,noreferrer');
  };

  const handleProposalSubmit = () => {
    router.push(`/dashboard/projects/${data.id}/submit-proposal`);
  };

  const handleProposalEdit = () => {
    router.push(`/dashboard/projects/${data.id}/edit-proposal`);
  };

  const handleMessage = () => {
    router.push(`/dashboard/messaging`);
  };

  const LocationInfo = ({ address }) => {
    const { streetAddress, addressLine2, city, state, zip, country } = address;

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

  if (isLoading) return <LoadingScreen />;
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between gap-4 mb-4">
        <h4 className="text-2xl font-bold text-start w-full">
          Client Information
        </h4>
        <div
          className={"px-4 py-1 rounded-lg text-center font-semibold w-15 " +
            (data.status.toLowerCase() == "accepted"
              ? "bg-success text-white"
              : data.status.toLowerCase() == "rejected"
                ? "bg-danger text-white"
                : data.status.toLowerCase() == "new"
                  ? "bg-purple/20 text-white"
                  : data.status.toLowerCase() == "completed"
                    ? "bg-success/20 text-white"
                    : data.status.toLowerCase() == "sent"
                      ? "bg-orange/20 text-white"
                      : data.status.toLowerCase() == "start_scan"
                        ? "bg-purple text-white"
                        : data.status.toLowerCase() == "end_scan"
                          ? "bg-green text-white"
                          : data.status.toLowerCase() == "posted"
                            ? "bg-blue-500 text-white"
                            : "bg-danger-100/20 text-white")
          }
        >
          {data.status}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mt-2 gap-5">
          <div className="flex gap-3 items-center justify-start cursor-pointer">
            <Image
              src={data.avatar ?? DefaultAvatar}
              width={96}
              height={96}
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
              <a href={data.approved_yembo_link}>View Survey Results</a>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[850px]">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Origin Information</h3>
            <div className="text-sm font-normal">
              <LocationInfo address={JSON.parse(data.from)} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Additional Stop Information</h3>
            <div className="text-sm font-normal">
              {(JSON.parse(data.extra_stops)).length != 0 && <LocationInfo address={JSON.parse(data.extra_stops)[0]} />}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Destination</h3>
            <div className="text-sm font-normal">
              <LocationInfo address={JSON.parse(data.destination)} />
            </div>
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
      <div className={`${userData.mover.charges_enabled ? 'block' : 'hidden'}`}>
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
            <Button className={`w-full md:w-56 rounded-md  ${submittedProposal.result ? 'visible' : 'invisible'}`} onClick={handleClick}>
              Create Contract
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectDetails;
