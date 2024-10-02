import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import { FaIndustry } from "react-icons/fa";
import { Link } from "react-router-dom";
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
          <Link to="/">
          <button className=" font-bold text-white px-2 rounded-md">
            Home
          </button></Link>
          <Link to ="/orders">

          <button className=" font-bold text-white px-2 rounded-md">Orders</button>
          </Link>
          {/* <button className=" font-bold px-2 rounded-md">About</button> */}
        </div>
      </div>
      <div className="h-px bg-gray-600"></div>
    </>
  );
};
