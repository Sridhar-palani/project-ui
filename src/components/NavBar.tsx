import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import { FaIndustry } from "react-icons/fa";
export const NavBar = () => {
  const { theme } = useContext(AppContext);
  return (
    <>
      <div className={`${theme.colors.primary} py-3 flex justify-around text-white`}>
        <div className="flex gap-2">
          <div>
            <FaIndustry size={"1.5rem"} />
          </div>
          <div className="font-bold">Karthick Industries</div>
        </div>
        <div className="flex gap-5">
          <button className="bg-slate-950 font-bold px-2 rounded-md">
            Home
          </button>
          <button className=" font-bold px-2 rounded-md">Orders</button>
          {/* <button className=" font-bold px-2 rounded-md">About</button> */}
        </div>
      </div>
      <div className="h-px bg-gray-600"></div>
    </>
  );
};
