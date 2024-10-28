"use client";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import SettingImage from "../../../../../public/images/setting.png";
import Logo from "../../../../../public/images/logo/logo.png";
import { useEffect, useState } from "react";
import CommonModel from "../../components/common-model";
import { useUser } from "@/lib/userContext";
import { createConnectAccount, createDashboardLink, deleteConnectAccount, updateUser, sendSupportEmail } from "@/services/api";
import { notification } from 'antd';

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const settingFields = { "Marketing Emails": "marketing_emails", "New Messages": "new_messages", "Invoice Paid": "invoice_paid", "Proposal Accepted": "proposal_accepted", "Proposal Rejected": "proposal_rejected", "Important Account Updates": "account_updates", "Service International Clients": "service_international_clients", "Auto Transport": "auto_transport", "Home Moving": "home_moving" };

const SettingsPage = () => {
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

  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, setUserData } = useUser();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  useEffect(() => {
    setSwitchStates({
      "Marketing Emails": userData.marketing_emails == 1,
      "New Messages": userData.new_messages == 1,
      "Invoice Paid": userData.invoice_paid == 1,
      "Proposal Accepted": userData.proposal_accepted == 1,
      "Proposal Rejected": userData.proposal_rejected == 1,
      "Important Account Updates": userData.account_updates == 1,
      "Service International Clients": userData.service_international_clients == 1,
      "Auto Transport": userData.auto_transport == 1,
      "Home Moving": userData.home_moving == 1,
    });
  }, [userData]);

  const handleSaveChanges = () => {
    if (apiKey !== "valid_api_key") {
      setError("Invalid API Key! Try Again");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendSupportEmail(formData);
      openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", "Contact Support Email Sent Successfully");
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      let errorMessage = "An error occurred"; // Default message

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Extract the custom message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to general error message
      }
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const handleToggleSwitch = async (label) => {
    try {
      const updatedData = {
        [settingFields[label]]: !switchStates[label] == true ? 1 : 0,
      };
      await updateUser(updatedData);
      setSwitchStates((prevStates) => ({
        ...prevStates,
        [label]: !prevStates[label],
      }));
    } catch (error) {
      let errorMessage = "An error occurred"; // Default message

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Extract the custom message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to general error message
      }
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
  };

  const onViewStripeDashboard = async () => {
    try {
      const response = await createDashboardLink(userData.mover.stripe_account_id);
      if (response) {
        const accountLink = response.accountLink;
        window.open(accountLink, "_blank");
        // const accountLink = await createAccountLink(response.id);
      }
    } catch (error) {
      let errorMessage = "An error occurred"; // Default message

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Extract the custom message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to general error message
      }
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
    }
  }

  const onCreateNewAccount = async () => {
    try {
      const response = await createConnectAccount(userData.id, userData.email, userData.mover.company_name);
      if (response) {
        const accountLink = response.accountLink;
        window.open(accountLink, "_self");
      }
    } catch (error) {
      let errorMessage = "An error occurred"; // Default message

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Extract the custom message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to general error message
      }
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
    }
  }

  const onDisconnectAccount = async () => {
    try {
      const response = await deleteConnectAccount(userData.mover.id);
      if (response) {
        openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", response.message);
        setUserData({ ...userData, mover: { ...userData.mover, stripe_account_id: null } });
      }
    } catch (error) {
      let errorMessage = "An error occurred"; // Default message

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Extract the custom message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to general error message
      }
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
    }
  }

  return (
    <>
      {contextHolder}
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
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
              ].map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <Switch
                    className="bg-white"
                    checked={switchStates[label]}
                    onCheckedChange={() => handleToggleSwitch(label)}
                  />
                  <span className="text-sm ">
                    {switchStates[label] ? "(ON)" : "(OFF)"}
                  </span>
                  <span className="text-sm font-light">{label}</span>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-bold text-start w-full mb-4">
              Service Platform Options
            </h4>
            <div className="space-y-2 mb-6">
              {["Service International Clients", "Auto Transport", "Home Moving"].map(
                (label) => (
                  <div key={label} className="flex items-center gap-3">
                    <Switch
                      className="bg-white"
                      checked={switchStates[label]}
                      onCheckedChange={() => handleToggleSwitch(label)}
                    />
                    <span className="text-sm ">
                      {switchStates[label] ? "(ON)" : "(OFF)"}
                    </span>
                    <span className="text-sm font-light">{label}</span>
                  </div>
                )
              )}
            </div>

            <h4 className="text-lg font-bold text-start w-full mb-4">
              Google Reviews Connection
            </h4>
            <div className="space-y-2 mb-4">
              <div className="flex flex-col md:flex-row max-w-[452px] items-center gap-4 md:gap-0">
                <InputWithLabel
                  type="text"
                  label=""
                  className="w-full md:max-w-72 h-14"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <div className="flex flex-col gap-3">
                  <Button
                    className="max-w-full md:max-w-52 rounded-xl font-bold"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
              {error && (
                <span className="text-sm font-bold text-red-500">{error}</span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-start w-full mb-4">
              Stripe Connect Settings
            </h4>
            <div className="space-y-2 mb-6">
              <div className="flex flex-col gap-3">
                <span>Stripe Account: {userData.mover.stripe_account_id ?? 'Not Connected'}</span>
                <div className="flex flex-col gap-3">
                  {userData.mover.charges_enabled == 1 && <Button className="max-w-52 rounded-xl font-bold" onClick={onViewStripeDashboard}>
                    Visit Stripe Dashboard
                  </Button>}
                  {userData.mover.stripe_account_id && <Button variant="danger" className="max-w-52 rounded-xl font-bold" onClick={onDisconnectAccount}>
                    Disconnect Account
                  </Button>}
                </div>
              </div>
            </div>
            {userData.mover.stripe_account_id == null && <div className="space-y-2 mb-20">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Button className="max-w-52 rounded-xl font-bold" onClick={onCreateNewAccount}>
                    Connect New Account
                  </Button>
                </div>
              </div>
            </div>}
          </div>
        </div>

        <h4 className="text-lg font-bold text-start w-full mb-4">
          Support & Help
        </h4>
        <div className="grid lg:grid-cols-2 gap-10 justify-between mb-7 bg-midnight rounded-3xl p-5">
          <div className="flex flex-col gap-4 md:gap-10">
            <div>
              <h3 className="text-xl md:text-3xl font-semibold">
                We’re here to help
              </h3>
              <p className="text-sm md:text-base font-normal">
                If you have any issues or questions please use the form below to
                contact our support team.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
              <div className="flex flex-col md:flex-row gap-[14px]">
                <InputWithLabel
                  type="text"
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <InputWithLabel
                  type="text"
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <InputWithLabel
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputWithLabel
                type="tel"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <InputWithLabel
                type="textarea"
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                className="rounded-xl font-bold"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Contact Support'}
              </Button>
            </form>
          </div>
          <div className="relative hidden lg:block">
            <Image
              src={SettingImage}
              alt="setting image"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-4 lg:bottom-12 left-4 w-full text-white p-4 flex flex-col space-y-2">
              <p className="text-base font-normal">
                “Making the world a smaller place, one move at a time.”
              </p>
              <Image src={Logo} alt="logo" className="w-[144px]" />
              <p className="text-base font-medium">Movemint.io</p>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-bold text-start w-full mb-4">
          Data Privacy Settings
        </h4>
        <div className="space-y-2 flex flex-col gap-7">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <span>Your User Data</span>
            <Button className="max-w-full md:max-w-[105px] rounded-xl font-bold">
              Download
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-11">
            <div className="flex flex-col gap-0">
              <span>Delete Your Account</span>
              <span className="text-xs font-bold text-white text-center">
                (Cannot be undone)
              </span>
            </div>
            <Button
              variant="danger"
              className="max-w-full md:max-w-[105px] rounded-xl font-bold"
            >
              Delete
            </Button>
          </div>
        </div>
        {isModalOpen && (
          <CommonModel
            mainHeading="You’ve been logged out"
            subHeading="You’ve been logged out, please sign back in or return home."
            cancelButtonContent="Return To Home"
            mainButtonContent="Sign In"
            setIsModalOpen={setIsModalOpen}
            isDanger={true}
            showInputFields={false}
            onMainButtonClick={handleModalConfirm}
          />
        )}
      </div>
    </>
  );
};

export default SettingsPage;
