import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

export const Hero = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className={`py-12 flex-col ${theme.colors.primary} text-center`}>
      <div className="text-4xl font-bold text-white ">Karthick Industries</div>
      <div className="text-white"   >Something about the company</div>
    </div>
  );
};
