import { useAppContext } from "@/contexts/AppContext";
import { FaIndustry } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLogoutUser } from "@/hooks/user/logout/logout-user";

export const NavBar = () => {
  const { isLoggedIn } = useAppContext();
  const location = window.location.pathname;
  const activeTab = location;
  const { mutate } = useLogoutUser();

  return (
    <>
      <div className="py-3 flex justify-around bg-indigo-500 text-white">
        <div className="flex gap-2">
          <div>
            <FaIndustry size={"1.5rem"} />
          </div>
          <div className="font-bold">Karthick Industries</div>
        </div>
        <div className="flex gap-5">
          {isLoggedIn ? (
            <>
              <Link to="/user">
                <button
                  className={`font-bold text-white px-2 rounded-md hover:bg-indigo-200 ${
                    activeTab === "/user" ? "bg-indigo-300" : ""
                  }`}
                >
                  Home
                </button>
              </Link>
              <Link to="/orders">
                <button
                  className={`font-bold text-white px-2 rounded-md hover:bg-indigo-200 ${
                    activeTab === "/orders" ? "bg-indigo-300" : ""
                  }`}
                >
                  Orders
                </button>
              </Link>
              <button
                className=" px-3 rounded-sm font-bold hover:bg-indigo-200 text-white"
                onClick={() => mutate()}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {location === "/" && (
                <Link
                  to="/sign-in"
                  className="flex bg-white items-center rounded-sm text-blue-600 px-3 font-bold hover:bg-indigo-200"
                >
                  Sign In
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      <div className="h-px bg-gray-600"></div>
    </>
  );
};
