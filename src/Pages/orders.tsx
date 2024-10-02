import { useState } from "react";
import { useGetJobs } from "@/hooks/useGetJobs";
import { JobsCard } from "../components/JobsCard";
import { NavBar } from "@/components/NavBar";

export const Jobs = () => {
  const [page, setPage] = useState(1); // Track current page number
  const { data, isLoading, isError, error } = useGetJobs(page);
  const totalPages = data?.totalPages || 3; // Assuming you get total pages from the API

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages)); // Increment page, not exceeding totalPages
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1)); // Decrement page, but not below 1

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-200 py-5">
        <div className="text-indigo-400 text-center font-extrabold text-xl">
          Browse Orders
        </div>

        {isLoading && <div className="m-auto">Loading...</div>}
        {isError && <div className="m-auto">Error: {error.message}</div>}
        
        <div className="flex flex-wrap justify-center">
          {data &&
            data.orders?.map((order, index: number) => (
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-2">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={page === 1} // Disable if on the first page
            className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-4 py-2 rounded ${
                  page === pageNumber ? 'bg-gray-400 text-white' : 'bg-white text-indigo-500'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={page === totalPages} // Disable if on the last page
            className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

