import { useGetJobs } from "@/hooks/useGetJobs";
import { JobsCard } from "../components/JobsCard";

export const Jobs = () => {
  const { data, isLoading, isError, error } = useGetJobs();

  return (
    <div className="bg-slate-200 py-5">
      <div className="text-indigo-400 text-center font-extrabold text-xl">
        Browse Orders
      </div>

      {isLoading && <div className="m-auto">Loading...</div>}
      {isError && <div className="m-auto">Error: {error.message}</div>}
      <div className="flex flex-wrap justify-center">
        {data &&
          data.orders.map((order, index: number) => (
            <JobsCard
              title={order.dc_no}
              key={index}
              address={order.to}
              description={order.product_description}
              status="done"
              total={order.gross_total}
            />
          ))}
      </div>
    </div>
  );
};