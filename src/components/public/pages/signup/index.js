"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { signupMover } from '@/services/api';
import { auth, createUserWithEmailAndPassword } from "@/services/firebase"; // Adjust the import as per your project structure
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/userContext";
import { notification } from 'antd';
import Recaptcha from "./recaptcha";

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    officeLocation: "",
    additionalLocation: "",
    companyNumber: "",
    companyEmail: "",
    companyName: "",
    companyQuarters: "",
    taxNumber: "",
    businessYear: "",
    isIntShipping: "both",
    bio: "",
    password: "",
    recaptchaToken: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, setIsAuthenticated, setUserData } = useUser();
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user && isAuthenticated) {
        // Redirect to login page if no user is logged in
        router.push('/onboarding');
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router, isAuthenticated]);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const onVerify = (token) => {
    setFormData({ ...formData, recaptchaToken: token });
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!formData.recaptchaToken) {
      openNotificationWithIcon(NotificationTypes.WARNING, "Warning", "Please complete the reCAPTCHA.");
      setLoading(false);
      return;
    }
    try {
      const { email, password } = formData;

      // Create a new user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // After Firebase sign-up, send the user data to the backend
      await sendDataToBackend(user);
    } catch (error) {
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Send form data and Firebase user ID to the backend
  const sendDataToBackend = async (user) => {
    const {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      officeLocation,
      additionalLocation,
      companyNumber,
      companyName,
      companyEmail,
      companyQuarters,
      taxNumber,
      businessYear,
      isIntShipping,
      bio,
      recaptchaToken
    } = formData;

    const dataToSend = {
      first_name: firstName,
      last_name: lastName,
      email: user.email, // From Firebase Authentication
      country_code: countryCode,
      phone_number: phoneNumber,
      locations: [officeLocation, additionalLocation], // Converting locations to an array as expected by the backend
      company_number: companyNumber,
      company_name: companyName,
      company_email: companyEmail,
      company_quarters: companyQuarters,
      tax_number: taxNumber,
      business_year: businessYear,
      is_int_shipping: isIntShipping,
      bio,
      recaptchaToken
    };

    try {
      const response = await signupMover(dataToSend);

      if (response.result) {
        openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", "Signup successful! Redirecting...");
        setUserData(response.data);
        setIsAuthenticated(true);
        router.push("/onboarding");
      } else {
        openNotificationWithIcon(NotificationTypes.ERROR, "Error", response.data.message);
      }
    } catch (error) {
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", error.message);
    }
  };

  return (
    <>
      {contextHolder}
      ! isAuthenticated && <div className="py-8 max-w-5xl mx-auto w-full shadow-lg rounded-lg">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl text-foreground font-bold mb-6">
          Let&apos;s Get Started
        </h1>
        <p className="mb-6 text-foreground md:text-lg lg:text-2xl">
          Our support team will use these details to contact you.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="mb-4">
            <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
              Basic Information:
            </h2>
            <InputWithLabel
              id="firstName"
              type="text"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="lastName"
              type="text"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="countryCode"
              type="text"
              label="Country Code"
              value={formData.countryCode}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="phoneNumber"
              type="number"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company Details */}
          <div className="mb-4">
            <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
              Company Details:
            </h2>

            <RadioGroup
              defaultValue="both"
              onValueChange={(value) => setFormData({ ...formData, isIntShipping: value })}
              className="flex items-center mb-5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="interstate" id="interstate" />
                <Label htmlFor="interstate">Interstate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="international" id="international" />
                <Label htmlFor="international">International</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Both</Label>
              </div>
            </RadioGroup>

            <InputWithLabel
              id="companyName"
              type="text"
              label="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="companyEmail"
              type="email"
              label="Company Email"
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="companyNumber"
              type="text"
              label="Company Number"
              value={formData.companyNumber}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="officeLocation"
              type="text"
              label="Office Location"
              value={formData.officeLocation}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="additionalLocation"
              type="text"
              label="Additional Office Locations"
              value={formData.additionalLocation}
              onChange={handleChange}
            />
          </div>

          {/* Business Information */}
          <div className="mb-4">
            <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
              Business Information:
            </h2>

            <InputWithLabel
              id="companyQuarters"
              type="text"
              label="Company Quarters"
              value={formData.companyQuarters}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="taxNumber"
              type="text"
              label="Tax Identification Number (EIN)"
              value={formData.taxNumber}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="businessYear"
              type="number"
              label="Years in Business"
              value={formData.businessYear}
              onChange={handleChange}
              required
            />
            <InputWithLabel
              id="bio"
              type="text"
              label="Company Bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>

          {/* Legal Information */}
          <div className="mb-4">
            <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
              Legal Information:
            </h2>
            <div className="mb-6 py-4 px-5 border border-foreground rounded-md">
              <h3 className="text-md md:text-lg lg:text-2xl font-semibold mb-6 text-foreground">
                Terms & Conditions:
              </h3>
              <div className="space-y-4">
                <p className="text-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  euismod, nisi vel consectetur facilisis, nisl nunc tincidunt justo,
                  id tincidunt libero augue non nulla. Praesent vestibulum tincidunt
                  tellus, nec luctus sapien convallis ac.
                </p>
              </div>
            </div>
            <div className="mb-6 py-4 px-5 border border-foreground rounded-md">
              <h3 className="text-md md:text-lg lg:text-2xl font-semibold mb-6 text-foreground">
                Privacy Policy:
              </h3>
              <div className="space-y-4">
                <p className="text-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
                  nisi vel consectetur facilisis, nisl nunc tincidunt justo, id tincidunt libero
                  augue non nulla.
                </p>
              </div>
            </div>

            <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions listed above.
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="privacy" required />
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the privacy policy listed above.
                </label>
              </div>
            </div>
          </div>
          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
            Verification and Security:
          </h2>
          <Recaptcha onVerify={onVerify} />

          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-foreground font-bold mb-6">
            Submission:
          </h2>

          <Button
            variant="destructive"
            type="submit"
            className="h-24 text-xl md:text-2xl lg:text-3xl py-4 md:py-5 lg:py-7"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Signup;
