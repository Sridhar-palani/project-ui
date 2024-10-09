// hooks/useGetJobs.ts
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

// Define queryKey type as a tuple containing a string, number, and optional string
type JobsQueryKey = [string, number, string?];

// Define the structure of a Job
interface Job {
  dc_no: number;
  to: string;
  date: string;
  // Add other relevant fields here
}

// Define the structure of the API response
interface GetJobsResponse {
  page: number;
  total: number;
  totalPages: number;
  orders: Job[];
}

export const useGetJobs = (page: number, search: string) => {
  const fetchJobs = async ({ queryKey }: QueryFunctionContext<JobsQueryKey>): Promise<GetJobsResponse> => {
    const [, page, search] = queryKey;
    let url = `http://localhost:5001/orders?page=${page}`;

    if (search && search.trim() !== "") {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return response.json();
  };

  return useQuery<GetJobsResponse, Error>({
    queryKey: ["jobs", page, search] as JobsQueryKey,
    queryFn: fetchJobs,
    keepPreviousData: true, // Keeps data from the previous query while fetching new data
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
  });
};
