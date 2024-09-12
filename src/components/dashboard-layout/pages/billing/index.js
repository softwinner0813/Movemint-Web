"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const Billing = () => {
  const [switchStates, setSwitchStates] = useState({
    "Marketing Emails": false,
    "New Messages": true,
    "Invoice Paid": true,
    "Proposal Accepted": true,
    "Proposal Rejected": true,
    "Important Account Updates": true,
    "Service International Clients": false,
    "Auto Transport": true,
    "Home Moving": false,
  });

  const handleToggleSwitch = (label) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [label]: !prevStates[label],
    }));
  };

  return (
    <div className="p-4 md:p-8">
      <h4 className="text-lg font-bold text-start w-full mb-4">
        Contact Preferences
      </h4>
      <div className="space-y-2 mb-6">
        {[
          "Marketing Emails",
          "New Messages",
          "Invoice Paid",
          "Proposal Accepted",
          "Proposal Rejected",
          "Important Account Updates",
        ].map((label, index) => (
          <div key={label} className="flex items-center gap-3">
            <Switch
              checked={switchStates[label]}
              onCheckedChange={() => handleToggleSwitch(label)}
              id={`${label}-${index}`}
              className="bg-white"
            />
            <span className="text-sm ">
              {switchStates[label] ? "(ON)" : "(OFF)"}
            </span>
            <Label htmlFor={`${label}-${index}`} className="text-sm font-light">
              {label}
            </Label>
          </div>
        ))}
      </div>

      <h4 className="text-lg font-bold text-start w-full mb-4">
        Service Platform Options
      </h4>
      <div className="space-y-2 mb-6">
        {["Service International Clients", "Auto Transport", "Home Moving"].map(
          (label, index) => (
            <div key={label} className="flex items-center gap-3">
              <Switch
                id={`${label}-${index}`}
                checked={switchStates[label]}
                onCheckedChange={() => handleToggleSwitch(label)}
                className="bg-white"
              />
              <span className="text-sm ">
                {switchStates[label] ? "(ON)" : "(OFF)"}
              </span>
              <Label
                htmlFor={`${label}-${index}`}
                className="text-sm font-light"
              >
                {label}
              </Label>
            </div>
          )
        )}
      </div>

      <h4 className="text-lg font-bold text-start w-full mb-4">
        Stripe Connect Settings
      </h4>
      <div className="space-y-2 mb-6">
        <div className="flex flex-col gap-3">
          <span>Stripe Account #28302dh012300932j10</span>
          <div className="flex flex-col gap-3">
            <Button className="max-w-52 rounded-xl font-bold">
              Visit Stripe Dashboard
            </Button>
            <Button variant="danger" className="max-w-52 rounded-xl font-bold">
              Disconnect Account
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-20">
        <div className="flex flex-col gap-3">
          <span>No Stripe Account Connected</span>
          <div className="flex flex-col gap-3">
            <Button className="max-w-52 rounded-xl font-bold">
              Connect New Account
            </Button>
          </div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-start w-full mb-4">
        Data Privacy Settings
      </h4>
      <div className="space-y-2 flex flex-col gap-7">
        <div className="flex gap-8 items-center">
          <span>Your User Data</span>
          <Button className="max-w-[105px] rounded-xl font-bold">
            Download
          </Button>
        </div>
        <div className="flex items-center gap-11">
          <div className="flex flex-col gap-0">
            <span>Delete Your Account</span>
            <span className="text-xs font-bold text-white text-center">
              (Cannot be undone)
            </span>
          </div>
          <Button
            variant="danger"
            className="max-w-[105px] rounded-xl font-bold"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
