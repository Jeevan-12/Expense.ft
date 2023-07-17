import React, { createContext, useContext, useState } from 'react';

const totalContext = createContext();

function ContextProvider({ children }) {
  const [spend, setSpend] = useState();

  return (
    <totalContext.Provider value={{ spend, setSpend }}>
      {children}
    </totalContext.Provider>
  );
}

export const TotalState = () => {
  return useContext(totalContext);
};

export default ContextProvider;
