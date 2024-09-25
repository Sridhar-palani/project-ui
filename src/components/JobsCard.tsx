import { FaMapMarker, FaRupeeSign } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { Link } from "react-router-dom";
type JobsCardProp = {
  title: string;
  description: string;
  total: number;
  status: string;
  address: string;
};

export const JobsCard = ({
  title: dc,
  description,
  total,
  address,
  status,
}: JobsCardProp) => {
  return (
    <div className="m-4 p-4 bg-white rounded-lg shadow-md w-1/4">
      <div className="text-gray-600 text-xs font-semibold">
        {" "}
        <FaBarsProgress />
      </div>
      <div className="text-black text-m font-semibold mt-1">{dc}</div>
      <div className="text-gray-500 text-xs font-semibold mt-3">
        {description}
      </div>
      <div className="text-gray-400 flex gap-1 text-xs font-semibold mt-3">
        {total} <FaRupeeSign />
      </div>
      <div className="h-px bg-slate-400 mt-3"></div>
      <div className="flex justify-between items-center">
        <div className="text-gray-600 text-xs font-semibold mt-3 flex gap-1">
          <FaMapMarker />
          {address}
        </div>
        <Link to={`/orders/${dc}`}>
          <button className="text-white text-xs font-semibold mt-3 bg-indigo-500 py-1 px-2 rounded-md">
            Read more
          </button>
        </Link>
      </div>
    </div>
  );
};
