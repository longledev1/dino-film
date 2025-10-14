import React, { createContext, useContext, useState } from "react";
const TabsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTabsContext = () => {
  return useContext(TabsContext);
};

const TabsProvider = ({ children }) => {
  const [activeTabID, setActiveTabID] = useState();

  return (
    <TabsContext.Provider value={{ activeTabID, setActiveTabID }}>
      {children}
    </TabsContext.Provider>
  );
};

export default TabsProvider;
