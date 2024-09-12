"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import DynamicTable from "./dynamic-table";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const SubmitProposal = ({ id }) => {
  const [date, setDate] = useState();
  const pathName = usePathname();
  console.log("proposal", id);

  // Determine if the current path is for editing a proposal
  const isEditProposal = pathName.includes("edit-proposal");

  return (
    <div className="p-4 md:p-8">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-x-7 max-w-4xl">
          <InputWithLabel
            labelClassName="text-lg"
            id="customerName"
            type="text"
            label="Customer Name"
          />
          <InputWithLabel
            labelClassName="text-lg"
            id="customerAddress"
            type="text"
            label="Customer Address"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-x-7 max-w-4xl">
          <DatePicker
            labelClassName="text-lg"
            date={date}
            setDate={setDate}
            id={"proposalDate"}
            label={"Proposal Date"}
          />
          <DatePicker
            labelClassName="text-lg"
            date={date}
            setDate={setDate}
            id={"proposalDate"}
            label={"Proposal Date"}
          />
          <div className="flex items-center">
            <div className="flex gap-2 items-center md:translate-y-3">
              <Checkbox id="doesNotExpire" />
              <Label htmlFor={"doesNotExpire"} className="text-xs">
                Does Not Expire
              </Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <h4 className="text-2xl font-bold text-start">Company Information</h4>
          <div className="flex gap-2 items-center">
            <Checkbox id="autofillInfo" />
            <Label htmlFor={"autofillInfo"} className="text-xs">
              Autofill Company Information
            </Label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-7 max-w-4xl">
          <InputWithLabel id="companyName" type="text" label="Company Name" />
          <InputWithLabel
            id="companyAddress"
            type="text"
            label="Company Address"
          />
          <InputWithLabel
            id="companyEmail"
            type="email"
            label="Company Email"
          />
          <InputWithLabel
            id="companyPhone"
            type="number"
            label="Company Phone Number"
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-7 max-w-4xl">
          <DatePicker
            labelClassName="text-lg"
            date={date}
            setDate={setDate}
            id={"proposedPackDate"}
            label={"Proposed Pack Date"}
          />
          <DatePicker
            labelClassName="text-lg"
            date={date}
            setDate={setDate}
            id={"proposedMoveDate"}
            label={"Proposed Move Date"}
          />
          <DatePicker
            labelClassName="text-lg"
            date={date}
            setDate={setDate}
            id={"deliveryFrom"}
            label={"Delivery From"}
          />
          <DatePicker
            labelClassName="text-lg"
            date={date}
            setDate={setDate}
            id={"deliveryTo"}
            label={"Delivery To"}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-x-7 max-w-lg">
          <InputWithLabel
            id="taxCalculation"
            type="text"
            label="Tax Calculation"
          />
          <div className="flex items-center">
            <div className="flex gap-2 items-center md:translate-y-2">
              <Checkbox id="autoCalculateTax" />
              <Label htmlFor={"autoCalculateTax"} className="text-xs">
                AUTO CALCULATE TAX
              </Label>
            </div>
          </div>
        </div>

        <DynamicTable />

        <div className="grid gap-1.5">
          <Label htmlFor={"personalMessage"} className="text-lg">
            Personal Message
          </Label>
          <Textarea
            id="personalMessage"
            placeholder="Type your message here."
          />
        </div>

        <h4 className="text-2xl font-bold text-start">Payment Options</h4>
        <div className="flex flex-wrap gap-x-7 gap-y-4 max-w-5xl">
          <div className="flex gap-2 items-center">
            <Checkbox id="creditAndDebit" />
            <Label htmlFor={"creditAndDebit"} className="text-xs">
              ENABLE CREDIT AND DEBIT CARD PAYMENTS
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="enableACHPayments" />
            <Label htmlFor={"enableACHPayments"} className="text-xs">
              ENABLE ACH PAYMENTS
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="acceptAllFormsOfPayments" />
            <Label htmlFor={"acceptAllFormsOfPayments"} className="text-xs">
              ACCEPT ALL FORMS OF PAYMENTS
            </Label>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-x-7 items-center">
          <div className="col-span-12 md:col-span-5">
            <InputWithLabel
              id="taxCalculation"
              type="text"
              label="Deposit (Optional)"
              labelClassName="text-lg"
            />
          </div>
          <p className="col-span-12 md:col-span-7 text-xs md:mt-4 md:translate-y-1">
            ENTER AMOUNT IN DOLLARS. LEAVE BLANK IF NO DEPOSIT IS REQUIRED.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-end gap-4">
          <Button
            className="md:w-auto text-background bg-foreground rounded-md space-x-2"
            style={{
              backgroundImage: "none",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 2.66667C4 1.19391 5.19391 0 6.66667 0H10.6667C12.1394 0 13.3333 1.19391 13.3333 2.66667V12H12V2.66667C12 1.93029 11.403 1.33333 10.6667 1.33333H6.66667C5.93029 1.33333 5.33333 1.93029 5.33333 2.66667V13.6667C5.33333 14.219 5.78105 14.6667 6.33333 14.6667H8.33333C8.88562 14.6667 9.33333 14.219 9.33333 13.6667V4.66667C9.33333 4.29848 9.03486 4 8.66667 4C8.29848 4 8 4.29848 8 4.66667V12H6.66667V4C6.66667 3.26362 7.26362 2.66667 8 2.66667H9.33333C10.0697 2.66667 10.6667 3.26362 10.6667 4V14C10.6667 15.1046 9.77124 16 8.66667 16H6C4.89543 16 4 15.1046 4 14V2.66667Z"
                fill="black"
              />
            </svg>
            Attach PDF Proposal
          </Button>
          <Button className="md:w-auto  rounded-md">
            {isEditProposal ? "Edit" : "Submit"} Proposal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitProposal;
