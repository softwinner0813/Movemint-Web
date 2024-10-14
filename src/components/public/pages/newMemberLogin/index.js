"use client"

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Input from "../../components/input";
import Logo from "../../../../../public/images/logo/logo.png";
import { Button } from "@/components/ui/button";
import { signupMember } from '@/services/api';
import { useRouter, useSearchParams } from "next/navigation";
import { auth, createUserWithEmailAndPassword } from "@/services/firebase";
import { useUser } from "@/lib/userContext";
import { createFirebaseUser } from "@/services/firebaseUser";
import { notification } from 'antd';

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const NewMemberLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } = useUser();
  const [api, contextHolder] = notification.useNotification();
  const searchParams = useSearchParams();
  const router = useRouter();

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  useEffect(() => {
    const base64Data = searchParams.get('data');
    if (base64Data) {
      try {
        // Decode the Base64 string
        const decodedData = atob(base64Data);
        // Split the decoded string to get company name and email (assuming "companyName|email")
        const [decodedCompanyName, decodedEmail] = decodedData.split("|");

        // Set the state with the decoded values
        setCompanyName(decodedCompanyName);
        setEmail(decodedEmail);
      } catch (error) {
        console.error("Error decoding Base64 data: ", error);
      }
    }
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user && isAuthenticated) {
        router.push('/onboarding');
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router.query, userData]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Navigate to the onboarding page after login
      const signerEmail = userCredential.user.email;
      const response = await signupMember({ email: signerEmail, firebase_uid: userCredential.user.uid });
      router.push('/onboarding');
      setUserData(response.data)
      setIsAuthenticated(true);
      await createFirebaseUser();
    } catch (error) {
      let errorMessage = "An error occurred"; // Default message

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Extract the custom message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to general error message
      }
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  if (isAuthenticated) {
    return <></>;
  }
  return (
    <>
      {contextHolder}
      <div className="relative z-10 w-full max-w-80 mx-auto space-y-6 text-center pt-8 pb-32">
        <Image
          src={Logo}
          alt="Movemint Logo"
          width={256}
          height={40}
          className="w-36 lg:w-48 xl:w-72 mx-auto"
        />
        <p className="text-center text-sm text-foreground font-bold">
          Please sign-in as a team member
        </p>
        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <Input
            className="text-black text-sm"
            type="text"
            placeholder="Company Name"
            value={companyName}
            readOnly
          />
          <Input
            className="text-black text-sm"
            type="email"
            placeholder="support@international.com"
            value={email}
            readOnly
          />
          <Input
            className="text-black text-sm"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            className="text-black text-sm"
            type="password"
            placeholder="Retype Password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
          <Button variant="default" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in with email"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewMemberLoginPage;
