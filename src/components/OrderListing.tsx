import { useState } from "react";
import { Link } from "react-router-dom";

type OrdersListingProp = {
  dc_no: string;
  to: string;
  date: string;
  status: string;
};

export const OrdersListing = ({
  dc_no,
  to,
  date,
  status,
}: OrdersListingProp) => {
  const [showFullTo, setShowFullTo] = useState(false);
  const dates = new Date(date);
  const formattedDate = dates.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <div className="m-5 grid grid-cols-4 justify-items-center">
        <div className="text-lg font-bold">
          <div>{dc_no}</div>
        </div>
        <div className="text-sm text-gray-500">
          <div>{formattedDate}</div>
        </div>
        <div className="text-lg font-bold">
          <div>
            {to.length > 25 ? (
              showFullTo ? (
                to
              ) : (
                <span className="">
                  {to.substring(0, 15)}...
                  <span
                    onClick={() => setShowFullTo(true)}
                    className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
                  >
                    Show more
                  </span>
                </span>
              )
            ) : (
              to
            )}
          </div>
        </div>
        <Link to={`/orders/${dc_no}`}>
          <button className="text-white text-xs font-semibold bg-indigo-500 py-1 px-2 rounded-md">
            View Order
          </button>
        </Link>
      </div>
    </div>
  );
};