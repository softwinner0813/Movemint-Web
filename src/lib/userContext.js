// contexts/userContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext(); // Create the context

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
  
    return (
      <UserContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserContext.Provider>
    );
  };
  
export const useUser = () => useContext(UserContext);