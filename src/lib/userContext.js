"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { checkAuth } from '@/services/api/authApi';
const UserContext = createContext(); // Create the context

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const response = await checkAuth();
          setIsAuthenticated(response.result);
          setUserData(response.data);
        } catch (error) {
          setIsAuthenticated(false);
        }
      };
  
      checkAuthentication();
    }, []);
  
    return (
      <UserContext.Provider value={{ userData, setUserData, isAuthenticated, setIsAuthenticated }}>
        {children}
      </UserContext.Provider>
    );
  };
  
export const useUser = () => useContext(UserContext);