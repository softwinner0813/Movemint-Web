"use client";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { CameraIcon, Minus, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { updateMover } from "@/services/api"; // Import backend service

const EditProfileForm = () => {
  const [selectedImage, setSelectedImage] = useState(""); // Avatar
  const [selectedBanner, setSelectedBanner] = useState(""); // Banner
  const [locations, setLocations] = useState([]); // State to store locations
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");

  // Personal Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");

  // Company Details
  const [companyName, setCompanyName] = useState("");
  const [companyHeadquarters, setCompanyHeadquarters] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [businessYear, setBusinessYear] = useState("");
  const [bio, setBio] = useState("");
  const [isInternationalShipping, setIsInternationalShipping] = useState("Yes");
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const uData = JSON.parse(localStorage.getItem('user-data'));
    if (userData.length === 0) {
      setUserData(uData);
      setFirstName(uData.first_name ?? "");
      setLastName(uData.last_name ?? "");
      setEmail(uData.email ?? "");
      setPhoneNumber(uData.phone_number ?? "");
      setCompanyName(uData.mover.company_name ?? "");
      setCompanyHeadquarters(uData.mover.company_headquarters ?? "");
      setCompanyEmail(uData.mover.company_email ?? "");
      setCompanyNumber(uData.mover.company_number ?? "");
      setTaxNumber(uData.mover.tax_number ?? "");
      setBio(uData.mover.bio ?? "");
      setIsInternationalShipping(uData.mover.is_int_shipping ?? "Yes");
      setBusinessYear(uData.mover.business_year ?? "");
    }
  });

  // Handle Image Upload
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

  // Handle Banner Upload
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

  // Add Location
  function addLocation() {
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
  }

  // Remove Location
  function removeLocation(id) {
    setLocations((prevLocations) => prevLocations.filter((location) => location.id !== id));
  }

  // Save Changes Handler
  async function saveChanges() {
    const profileData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      locations: JSON.stringify(locations.map((loc) => ({ name: loc.name, address: loc.address }))),
      company_number: companyNumber,
      company_name: companyName,
      company_email: companyEmail,
      company_quarters: companyHeadquarters,
      tax_number: taxNumber,
      business_year: businessYear,
      is_int_shipping: isInternationalShipping,
      bio,
      banner_img: selectedBanner,
      avatar: selectedImage,
    };

    // Call the backend to save the profile
    try {
      const response = await updateMover(userData.id, profileData); // Replace 1 with the actual user ID or identifier
      localStorage.setItem('user-data', JSON.stringify(response.data));
      setUserData(response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
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
              className={`w-[300px] sm:w-[400px] md:w-[512px] md:h-[200px] rounded-xl overflow-hidden flex items-center justify-center ${selectedBanner ? "" : "border-2 border-white border-dashed"
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
      <div className="w-full flex flex-col gap-4">
        <h4 className="text-2xl font-bold text-start w-full">Locations</h4>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {locations.map((location) => (
            <div
              key={location.id}
              className="relative border-2 border-white max-w-full sm:max-w-56 p-5 rounded-[10px]"
            >
              <h4 className="text-lg font-bold">{location.name}</h4>
              <p className="max-w-full sm:max-w-32 text-xs mt-1">
                {location.address}
              </p>
              <div
                className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => removeLocation(location.id)}
              >
                <span className="text-black text-xl leading-none">
                  <Minus size={18} />
                </span>
              </div>
            </div>
          ))}
        </div>

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
          <InputWithLabel
            type="text"
            label="Location Address"
            className="w-full sm:w-1/2"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
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
      <Button
        className="w-56 rounded-lg mt-5"
        onClick={saveChanges}
        type="button"
      >
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileForm;
