import { useGetJobsById } from "@/hooks/useGetorder";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { View } from "../components/View";

export const Details = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, isError, error } = useGetJobsById(id);
  const date = new Date(data?.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col flex-1 items-center">
        {isLoading && <div className="m-auto">Loading...</div>}
        {isError && <div className="m-auto">Error: {error.message}</div>}
        {data && (
          <div className="flex flex-col items-center">
            <div className="m-10 w-svw flex justify-center gap-16 text-white">
              <a
                href={"http://localhost:5001/pdf/" + data.dc_no}
                className="text-white hover:text-gray-400"
              >
                <button className="font-semibold  bg-indigo-500 p-1 rounded-sm  hover:bg-white hover:text-black">
                  Generate Invoice
                </button>
              </a>
              <button className="font-semibold  bg-indigo-500 p-1 rounded-sm  hover:bg-white hover:text-black">
                Generate DC
              </button>
            </div>
            <div className="mb-10 p-5  w-[30%]  rounded-md flex justify-center ">
              <div className="">
                <div className="font-semibold flex justify-between">
                  <span className="text-indigo-400">Date:</span>{" "}
                  <span className="font-bold"> {formattedDate}</span>
                </div>
                <div className="font-semibold flex justify-between">
                  <span className="text-indigo-400">E_way_no:</span>{" "}
                  <span className="font-bold ml-3">{data.e_way_no}</span>
                </div>
                <div className="font-semibold flex justify-between">
                  <span className="text-indigo-400">Dc_no:</span>{" "}
                  <span className="font-bold"> {data.dc_no}</span>
                </div>
                <div className="font-semibold flex justify-between">
                  <span className="text-indigo-400">Gross_total:</span>{" "}
                  <span className="font-bold"> {data.gross_total}</span>
                </div>
              </div>
            </div>
            <View data={data} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
