import { createContext, useContext } from 'react';
const ContextApp = createContext({});

const ContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ContextApp.Provider value={{}}>{children}</ContextApp.Provider>;
};

export default ContextProvider;
export const useApp = () => useContext(ContextApp);
