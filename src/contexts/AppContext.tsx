import { createContext, ReactNode } from "react";
const theme = {
  colors: {
    primary: import.meta.env.VITE_PRIMARY_COLOR,
    secondary: import.meta.env.VITE_SECONDARY_COLOR,
  },
};

export const AppContext = createContext({ theme });

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppContext.Provider value={{ theme }}>{children}</AppContext.Provider>
  );
};
