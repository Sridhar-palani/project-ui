import { useState } from "react";
import { Link } from "react-router-dom";

type OrdersListingProp = {
  dc_no: string;
  to: string;
  date: string;
  gross_total: string;
  status: string;
};

export const OrdersListing = ({
  dc_no,
  to,
  date,
  gross_total,
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
      <Link to={`/orders/${dc_no}`} className="text-black">
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
                    {to.substring(0, 22)}
                    <span
                      onClick={() => setShowFullTo(true)}
                      className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer text-nowrap"
                    >
                      ...
                    </span>
                  </span>
                )
              ) : (
                to
              )}
            </div>
          </div>
          <div className="text-lg font-bold">
            <div>{gross_total}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
