import React, { createContext, useContext, useEffect, useState } from "react";
import Auth from "./auth";

export const OrganiserContext = createContext(null);

export const useOrganiserContext = () => useContext(OrganiserContext);

export const OrganiserProvider = ({ children }) => {
  const [organiser, setOrganiser] = useState(null);
  useEffect(() => {
    const { organiser } = Auth.loggedIn();
    organiser && setOrganiser(organiser)
  }, [])
  return (
    <OrganiserContext.Provider value={organiser}>
      {children}
    </OrganiserContext.Provider>
  );
};
