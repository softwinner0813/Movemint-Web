"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import DynamicTable from "./dynamic-table";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { submitProposal, updateProposal } from "@/services/api";
import { getName } from "@/lib/utils";
import { useUser } from "@/lib/userContext";
import { notification } from 'antd';
import { useRouter } from "next/navigation";

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const SubmitProposal = ({ data }) => {
  const [isAutoFill, setIsAutoFill] = useState(true);
  const [isAutoCalculation, setIsAutoCalculation] = useState(true);
  const { userData } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const router  = useRouter();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD from the ISO string
  };

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  const [formData, setFormData] = useState({
    id: 0,
    mover_id: userData.id,
    project_id: "",
    customer_name: "",
    customer_address: "",
    proposal_date: formatDate(new Date()),
    proposal_expire_date: formatDate(new Date()),
    pack_date: formatDate(new Date()),
    move_date: formatDate(new Date()),
    delivery_from: formatDate(new Date()),
    delivery_to: formatDate(new Date()),
    not_expire: false,
    company_name: "",
    company_address: "",
    company_email: "",
    company_phone: "",
    tax: 0,
    message: "",
    payment_options: {
      enable_credit_debit: false,
      enable_ach: false,
      accept_all_payments: false,
    },
    deposit: 0,
    services: [],
  });

  const pathName = usePathname();
  const isEditProposal = pathName.includes("edit-proposal");
  useEffect(() => {
    if (isEditProposal) {
      setFormData(data);
      setIsLoading(false);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        project_id: data.id,
        customer_name: getName(data.first_name, data.last_name),
        customer_address: JSON.parse(data.from).description,
        company_name: userData.mover.company_name,
        company_email: userData.mover.company_email,
        company_phone: userData.mover.company_number,
        company_address: userData.mover.location,
      }));

      setIsLoading(false);
    }
  }, [isLoading == true]);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, role } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotExpire = () => {
    setFormData((prev) => ({
      ...prev,
      not_expire: !formData.not_expire,
    }));
  }

  const handleAutoFill = () => {
    setIsAutoFill(!isAutoFill);
  }

  const handleAutoCalculate = () => {
    setIsAutoCalculation(!isAutoCalculation);
  }

  const handlePaymentOptionChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      payment_options: {
        ...prev.payment_options,
        [id]: value == 'on',
      },
    }));
  };

  // Handle the dynamic table changes for services
  const handleServicesChange = (updatedServices) => {
    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = isEditProposal ? await updateProposal(formData) : await submitProposal(formData);
      if (response.result) {
        openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", "Proposal submitted successfully");
        router.push(`/dashboard/projects/${data.project_id}`)
      } else {
        openNotificationWithIcon(NotificationTypes.ERROR, "Error", response.message);
      }
      // Handle success, show a notification or redirect
    } catch (error) {
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", error.message);
    }
  };

  return (
    <>
      {contextHolder}
      {!isLoading && <div className="p-4 md:p-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-x-7 max-w-4xl">
            <InputWithLabel
              labelClassName="text-lg"
              id="customerName"
              name="customer_name"
              type="text"
              label="Customer Name"
              value={formData.customer_name}
              disabled
            />
            <InputWithLabel
              labelClassName="text-lg"
              id="customerAddress"
              name="customer_address"
              type="text"
              label="Customer Address"
              value={formData.customer_address}
              disabled
            />
          </div>
          <div className="grid md:grid-cols-3 gap-x-7 max-w-6xl">
            <DatePicker
              labelClassName="text-lg"
              date={formatDate(formData.proposal_date)}
              setDate={(date) => setFormData((prev) => ({ ...prev, proposal_date: formatDate(date) }))}
              id={"proposalDate"}
              label={"Proposal Date"}
            />
            <div
              className={`${!formData.not_expire ? "visible opacity-100" : "invisible opacity-0"
                } transition-opacity duration-300`}>
              <DatePicker
                labelClassName="text-lg"
                date={formatDate(formData.proposal_expire_date)}
                setDate={(date) => setFormData((prev) => ({ ...prev, proposal_expire_date: formatDate(date) }))}
                id={"proposalExpireDate"}
                label={"Proposal Expire Date"}
              />
            </div>
            <div className="flex items-center">
              <div className="flex gap-2 items-center md:translate-y-3">
                <Checkbox
                  id="doesNotExpire"
                  name="not_expire"
                  aria-checked={formData.not_expire}
                  defaultChecked={formData.not_expire == 1}
                  onClick={handleNotExpire}
                />
                <Label htmlFor={"doesNotExpire"} className="text-xs">
                  Does Not Expire
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <h4 className="text-2xl font-bold text-start">Company Information</h4>
            <div className="flex gap-2 items-center">
              <Checkbox id="autofillInfo" aria-checked={isAutoFill} defaultChecked={isAutoFill} onClick={handleAutoFill} />
              <Label htmlFor={"autofillInfo"} className="text-xs">
                Autofill Company Information
              </Label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-7 max-w-6xl">
            <InputWithLabel
              id="companyName"
              name="company_name"
              type="text"
              label="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              disabled={isAutoFill}
            />
            <InputWithLabel
              id="companyAddress"
              name="company_address"
              type="text"
              label="Company Address"
              value={formData.company_address}
              onChange={handleChange}
              disabled={isAutoFill}
            />
            <InputWithLabel
              id="companyEmail"
              name="company_email"
              type="email"
              label="Company Email"
              value={formData.company_email}
              onChange={handleChange}
              disabled={isAutoFill}
            />
            <InputWithLabel
              id="companyPhone"
              name="company_phone"
              type="number"
              label="Company Phone Number"
              value={formData.company_phone}
              onChange={handleChange}
              disabled={isAutoFill}
            />
          </div>
          <div className="grid md:grid-cols-4 gap-x-7 max-w-6xl">
            <DatePicker
              labelClassName="text-lg"
              date={formatDate(formData.pack_date)}
              setDate={(date) => setFormData((prev) => ({ ...prev, pack_date: formatDate(date) }))}
              id={"packDate"}
              label={"Pack Date"}
            />
            <DatePicker
              labelClassName="text-lg"
              date={formatDate(formData.move_date)}
              setDate={(date) => setFormData((prev) => ({ ...prev, move_date: formatDate(date) }))}
              id={"moveDate"}
              label={"Move Date"}
            />
            <DatePicker
              labelClassName="text-lg"
              date={formatDate(formData.delivery_from)}
              setDate={(date) => setFormData((prev) => ({ ...prev, delivery_from: formatDate(date) }))}
              id={"deliveryFrom"}
              label={"Delivery From"}
            />
            <DatePicker
              labelClassName="text-lg"
              date={formatDate(formData.delivery_to)}
              setDate={(date) => setFormData((prev) => ({ ...prev, delivery_to: formatDate(date) }))}
              id={"deliveryTo"}
              label={"Delivery To"}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-7 max-w-lg">
            <InputWithLabel
              id="taxCalculation"
              name="tax"
              type="text"
              label="Tax Calculation"
              value={formData.tax}
              onChange={(value) => setFormData((prev) => ({ ...prev, tax: parseFloat(value) }))}
              disabled={isAutoCalculation}
            />
            <div className="flex items-center">
              <div className="flex gap-2 items-center md:translate-y-2">
                <Checkbox aria-checked={isAutoCalculation} defaultChecked={isAutoCalculation} onClick={handleAutoCalculate} />
                <Label htmlFor={"autoCalculateTax"} className="text-xs">
                  AUTO CALCULATE TAX
                </Label>
              </div>
            </div>
          </div>

          {/* Services section (Dynamic Table) */}
          <DynamicTable services={formData.services} onServicesChange={handleServicesChange} />

          <div className="grid gap-1.5">
            <Label htmlFor={"personalMessage"} className="text-lg">
              Personal Message
            </Label>
            <Textarea
              id="personalMessage"
              name="message"
              placeholder="Type your message here."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <h4 className="text-2xl font-bold text-start">Payment Options</h4>
          <div className="flex flex-wrap gap-x-7 gap-y-4 max-w-5xl">
            <div className="flex gap-2 items-center">
              <Checkbox
                id="enable_credit_debit"
                aria-checked={formData.payment_options.enable_credit_debit}
                defaultChecked={formData.payment_options.enable_credit_debit}
                onClick={handlePaymentOptionChange}
              />
              <Label htmlFor={"enable_credit_debit"} className="text-xs">
                ENABLE CREDIT AND DEBIT CARD PAYMENTS
              </Label>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="enable_ach"
                aria-checked={formData.payment_options.enable_ach}
                defaultChecked={formData.payment_options.enable_ach}
                onClick={handlePaymentOptionChange}
              />
              <Label htmlFor={"enable_ach"} className="text-xs">
                ENABLE ACH PAYMENTS
              </Label>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="accept_all_payments"
                aria-checked={formData.payment_options.accept_all_payments}
                defaultChecked={formData.payment_options.accept_all_payments}
                onClick={handlePaymentOptionChange}
              />
              <Label htmlFor={"accept_all_payments"} className="text-xs">
                ACCEPT ALL FORMS OF PAYMENTS
              </Label>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-x-7 items-center">
            <div className="col-span-12 md:col-span-5">
              <InputWithLabel
                id="deposit"
                name="deposit"
                type="number"
                label="Deposit (Optional)"
                labelClassName="text-lg"
                value={formData.deposit}
                onChange={handleChange}
              />
            </div>
            <p className="col-span-12 md:col-span-7 text-xs md:mt-4 md:translate-y-1">
              ENTER AMOUNT IN DOLLARS. LEAVE BLANK IF NO DEPOSIT IS REQUIRED.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-end gap-4">
            <Button
              className="md:w-auto text-background bg-foreground rounded-md"
              style={{ backgroundImage: "none" }}
            >
              Attach PDF Proposal
            </Button>
            <Button className="md:w-auto  rounded-md"
              onClick={handleSubmit}>
              {isEditProposal ? "Edit" : "Submit"} Proposal
            </Button>
          </div>
        </div>
      </div>}
    </>
  );
};

export default SubmitProposal;
