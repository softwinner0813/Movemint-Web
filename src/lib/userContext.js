"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "@/services/api/authApi";
import LoadingScreen from "@/components/ui/loadingScreen";
import OneSignal from "react-onesignal";
const UserContext = createContext(); // Create the context

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    const checkAuthentication = async () => {
      try {
        const response = await checkAuth();
        setIsAuthenticated(response.result);
        setUserData(response.data);

        // OneSignal Login with Firebase UID
        if (response.data?.firebase_uid) {
          OneSignal.login(response.data.firebase_uid);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUserData({});
        // OneSignal Logout
        OneSignal.logout();
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      checkAuthentication();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <LoadingScreen />;
  return (
    <UserContext.Provider
      value={{ userData, setUserData, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
