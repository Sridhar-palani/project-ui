import { Toast } from "@/components/Toast";
import { validateToken } from "../hooks/validateToken/validateToken";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean; // set to true if token is valid, false otherwise
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMsg) => {
          setToast(toastMsg);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && <Toast {...toast} onClose={() => setToast(undefined)} />}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  return context as AppContext;
};
