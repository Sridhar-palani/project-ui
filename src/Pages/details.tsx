import { useGetJobsById } from "@/hooks/useGetorder";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { View } from "../components/View";

export const Details = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, isError, error } = useGetJobsById(id);
  return (
    <>
      <NavBar />
      <div className="flex flex-col bg-white">
        <div className=" self-center">
        <button className="m-2 rounded-md w-20 bg-indigo-400 text-black font-semibold">
          Invoice
        </button>
        
        <button className="m-2 rounded-md w-20 bg-indigo-400 text-black font-semibold">
          DC
        </button></div>
        {isLoading && <div className="m-auto">Loading...</div>}
        {isError && <div className="m-auto">Error: {error.message}</div>}
        {data && <View data={data} />}
      </div>
      <Footer />
    </>
  );
};
