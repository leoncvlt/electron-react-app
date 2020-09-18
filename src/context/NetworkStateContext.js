import React, { useState } from "react";

const NetworkStateContext = React.createContext(true);

export default NetworkStateContext;

export const NetworkStateContextProvider = ({ children }) => {
  const [online, setOnline] = useState(true);

  window.addEventListener("online", () => setOnline(true));
  window.addEventListener("offline", () => setOnline(false));

  return <NetworkStateContext.Provider value={online}>{children}</NetworkStateContext.Provider>;
};
