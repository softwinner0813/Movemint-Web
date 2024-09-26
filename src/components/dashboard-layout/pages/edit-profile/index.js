"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Minus, Upload, CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { updateMover } from "@/services/api"; // Import backend service
import { useUser } from "@/lib/userContext";
import { notification } from "antd";
import AutocompleteInputWithLabel from "./autoCompleteInputWithLabel"; // Import the new autocomplete component

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

const EditProfileForm = () => {
  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState(""); 

  // Personal Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Company Details
  const [companyName, setCompanyName] = useState("");
  const [companyHeadquarters, setCompanyHeadquarters] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [businessYear, setBusinessYear] = useState("");
  const [bio, setBio] = useState("");
  const [isInternationalShipping, setIsInternationalShipping] = useState("Yes");

  // Avatar and Banner
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const { userData, setUserData } = useUser();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  useEffect(() => {
    setFirstName(userData?.first_name || "");
    setLastName(userData?.last_name || "");
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.phone_number || "");
    setCompanyName(userData?.mover?.company_name || "");
    setCompanyHeadquarters(userData?.mover?.company_quarters || "");
    setCompanyEmail(userData?.mover?.company_email || "");
    setCompanyNumber(userData?.mover?.company_number || "");
    setTaxNumber(userData?.mover?.tax_number || "");
    setBio(userData?.mover?.bio || "");
    setIsInternationalShipping(userData?.mover?.is_int_shipping || "Yes");
    setBusinessYear(userData?.mover?.business_year || "");
    setAvatar(userData.avatar ? userData.avatar[0] === "/" ? process.env.NEXT_PUBLIC_BASE_URL + userData.avatar : userData.avatar : "");
    setBanner(userData.mover.banner_img ? userData.mover.banner_img[0] === "/" ? process.env.NEXT_PUBLIC_BASE_URL + userData.mover.banner_img : userData.mover.banner_img : "");
    setLocations(JSON.parse(userData.mover.locations) ?? []);
  }, [userData]);

  // Add a new location
  const addLocation = () => {
    if (locationName && locationAddress) {
      const newLocation = {
        id: Date.now(),
        name: locationName,
        address: locationAddress,
      };
      setLocations((prevLocations) => [...prevLocations, newLocation]);
      setLocationName("");
      setLocationAddress("");
    }
  };

  // Remove location by ID
  const removeLocation = (index) => {
    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations]; // Create a copy of the array
      updatedLocations.splice(index, 1); // Remove the element at the specified index
      return updatedLocations;
    });
  };
  

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setBanner(reader.result); // Update banner in parent component
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes handler
  const saveChanges = async () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("locations", JSON.stringify(locations.map((loc) => ({ name: loc.name, address: loc.address }))));
    formData.append("company_number", companyNumber);
    formData.append("company_name", companyName);
    formData.append("company_email", companyEmail);
    formData.append("company_quarters", companyHeadquarters);
    formData.append("tax_number", taxNumber);
    formData.append("business_year", businessYear);
    formData.append("is_int_shipping", isInternationalShipping);
    formData.append("bio", bio);

    if (avatarFile) {
      formData.append("avatar", avatarFile); // Add avatar file
    }
    if (bannerFile) {
      formData.append("banner", bannerFile); // Add banner file
    }

    try {
      const response = await updateMover(userData.id, formData);
      setUserData(response.data);
      openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", "Profile updated successfully!");
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

  return (
    <>
      {contextHolder}

      {/* Load Google Places API Script */}
      {/* <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      /> */}

      <form className="w-full flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
          <label htmlFor="uploadAvatar" className="flex flex-col items-center">
            {avatar ? (
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
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
            id="uploadAvatar"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
          <label htmlFor="uploadBanner" className="cursor-pointer">
            <div
              className={`w-[300px] sm:w-[400px] md:w-[512px] md:h-[200px] rounded-xl overflow-hidden flex items-center justify-center ${banner ? "" : "border-2 border-white border-dashed"
                }`}
            >
              {banner ? (
                <Image
                  src={banner}
                  alt="Uploaded Banner"
                  width={512}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center text-base md:text-[20px] p-4">
                  <Upload color="white" size={40} />
                  <p>Please upload a custom banner for your profile.</p>
                </div>
              )}
            </div>
            <p className="text-[14px] font-semibold text-primary mt-2">
              Upload Banner (Recommended: 512x256px)
            </p>
          </label>
          <input
            type="file"
            accept="image/*"
            id="uploadBanner"
            className="hidden"
            onChange={handleBannerUpload}
          />
        </div>

        {/* Personal Details Section */}
        <div className="w-full flex flex-col gap-4">
          <h4 className="text-2xl font-bold text-start w-full">Personal Details</h4>
          <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 items-center justify-center">
            <InputWithLabel
              type="text"
              label="First Name"
              className="flex-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputWithLabel
              type="text"
              label="Last Name"
              className="flex-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 justify-center">
            <div className="w-full sm:w-1/2">
              <InputWithLabel
                type="email"
                label="Email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <InputWithLabel
                type="tel"
                label="Phone Number"
                className="w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Company Details Section */}
        <div className="w-full flex flex-col gap-4">
          <h4 className="text-2xl font-bold text-start w-full">Company Details</h4>
          <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 items-center justify-center">
            <InputWithLabel
              type="text"
              label="Company Name"
              className="flex-1"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <InputWithLabel
              type="text"
              label="Company Headquarters"
              className="flex-1"
              value={companyHeadquarters}
              onChange={(e) => setCompanyHeadquarters(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 justify-center">
            <div className="w-full sm:w-1/2">
              <InputWithLabel
                type="email"
                label="Company Email"
                className="w-full"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <InputWithLabel
                type="tel"
                label="Company Number"
                className="w-full"
                value={companyNumber}
                onChange={(e) => setCompanyNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:pr-10">
            <InputWithLabel
              type="text"
              label="Tax Number"
              className="w-full sm:w-1/2"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
            />
          </div>
          <div className="w-full md:pr-10">
            <InputWithLabel
              type="text"
              label="Business Year"
              className="w-full sm:w-1/2"
              value={businessYear}
              onChange={(e) => setBusinessYear(e.target.value)}
            />
          </div>
          <div className="w-full md:pr-10">
            <InputWithLabel
              type="text"
              label="Company Bio (Max 256 words)"
              className="w-full sm:w-1/2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
                  value="Yes"
                  checked={isInternationalShipping === "Yes"}
                  onChange={() => setIsInternationalShipping("Yes")}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600 h-5 w-5"
                  name="shipping"
                  value="No"
                  checked={isInternationalShipping === "No"}
                  onChange={() => setIsInternationalShipping("No")}
                />
                <span className="ml-2">No</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600 h-5 w-5"
                  name="shipping"
                  value="Both"
                  checked={isInternationalShipping === "Both"}
                  onChange={() => setIsInternationalShipping("Both")}
                />
                <span className="ml-2">Both</span>
              </label>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div className="w-full flex flex-col gap-4">
          <h4 className="text-2xl font-bold text-start w-full">Locations</h4>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {locations.map((location, index) => (
              <div
                key={index}
                className="relative border-2 border-white max-w-full sm:max-w-56 p-5 rounded-[10px]"
              >
                <h4 className="text-lg font-bold">{location.name}</h4>
                <p className="max-w-full sm:max-w-32 text-xs mt-1">
                  {location.address}
                </p>
                <div
                  className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => removeLocation(index)}
                >
                  <span className="text-black text-xl leading-none">
                    <Minus size={18} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input fields for adding new location */}
          <div className="w-full mt-4 md:pr-10">
            <InputWithLabel
              type="text"
              label="Location name"
              className="w-full sm:w-1/2"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </div>
          <div className="w-full md:pr-10">
            <AutocompleteInputWithLabel
              label="Location Address"
              className="w-full sm:w-1/2"
              value={locationAddress}
              onChange={setLocationAddress}
            />
          </div>
          <Button
            className="w-full sm:w-[175px] sm:ml-[189px] py-1 px-1 rounded-lg"
            onClick={addLocation}
            type="button" // Prevent form submission
          >
            Add Location
          </Button>
        </div>

        {/* Save Changes Button */}
        <Button
          className="w-56 rounded-lg mt-5"
          onClick={saveChanges}
          type="button"
        >
          Save Changes
        </Button>
      </form>
    </>
  );
};

export default EditProfileForm;

