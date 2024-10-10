// components/Jobs.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useGetJobs } from "@/hooks/useGetJobs";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import debounce from "lodash.debounce";
import { OrdersListing } from "@/components/OrderListing";
import { Input } from "@/components/ui/input";

export const Jobs = () => {
  const [page, setPage] = useState(1); // Track current page number
  const [searchInput, setSearchInput] = useState(""); // Track input value
  const [search, setSearch] = useState(""); // Track debounced search value

  // Debounce the search input to update 'search' state after a delay
  const debounceSearch = useCallback(
    debounce((query: string) => {
      setSearch(query);
      setPage(1); // Reset to first page on new search
    }, 500), // 500ms delay
    []
  );

  // Handle input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debounceSearch(e.target.value);
  };

  const { data, isLoading, isError, error } = useGetJobs(page, search);
  const totalPages = data?.totalPages || 1; // Adjust default as needed

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  // Determine if search is active
  const isSearching = search.trim() !== "";

  return (
    <>
      <NavBar />
      <div className="bg-slate-200 py-5 flex flex-col items-center">
        <div className="text-indigo-400 text-center font-extrabold text-xl mb-5">
          Browse Orders
        </div>
        <Input
          type="search"
          aria-label="Search orders"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search orders..."
          className="w-full max-w-5xl py-2 pl-10 text-sm text-black bg-white rounded-md mb-4"
        />
        {isLoading && <div className="m-auto">Loading...</div>}
        {isError && (
          <div className="m-auto">
            Error: {error?.message || "An unexpected error occurred."}
          </div>
        )}
        {data?.orders?.length === 0 && !isLoading && !isError && (
          <div className="m-auto">No results found.</div>
        )}
        <div className="flex justify-around w-full max-w-5xl bg-white rounded-md mt-2 p-3 overflow-y-auto">
          <div className="text-lg font-bold">
            <div>DC No</div>
          </div>
          <div className="text-lg font-bold">
            <div>Date</div>
          </div>
          <div className="text-lg font-bold">
            <div>To</div>
          </div>
          <div className="text-lg font-bold">
            <div>Gross Total</div>
          </div>
        </div>
        {/* Orders Listing */}
        <div className="flex flex-col w-full max-w-5xl bg-white rounded-md min-h-[44rem] mt-2 p-4 overflow-y-auto">
          {data?.orders.map((order) => (
            <OrdersListing
              dc_no={order.dc_no}
              key={order.dc_no}
              to={order.to}
              date={order.date}
              gross_total={order.gross_total}
              status="done"
            />
          ))}
        </div>
        {/* Pagination Controls */}
        {!isSearching && data?.totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {/* Previous Button */}
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
              aria-label="Previous Page"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              const isNearCurrentPage =
                pageNumber === page || Math.abs(page - pageNumber) <= 1;

              const isFirstPage = pageNumber === 1;
              const isLastPage = pageNumber === totalPages;

              if (isFirstPage || isLastPage || isNearCurrentPage) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-4 py-2 rounded ${
                      page === pageNumber
                        ? "bg-gray-400 text-white"
                        : "bg-white text-indigo-500"
                    }`}
                    aria-label={`Page ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (pageNumber === 2 || pageNumber === totalPages - 1) {
                // Display ellipsis for skipping pages
                return <span key={pageNumber}>...</span>;
              }
              return null;
            })}

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={page === totalPages}
              className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
