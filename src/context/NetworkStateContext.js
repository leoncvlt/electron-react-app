import React from "react";

const NetworkStateContext = React.createContext(true);

export default NetworkStateContext;

export const NetworkStateContextProvider = ({ children }) => {
  const online = true;
  return (
    <NetworkStateContext.Provider value={online}>
      {children}
    </NetworkStateContext.Provider>
  );
};
