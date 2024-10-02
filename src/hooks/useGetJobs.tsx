import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

// Define queryKey type as a tuple containing a string and a number
type JobsQueryKey = [string, number];

export const useGetJobs = (page: number) => {
  const fetchJobs = async ({ queryKey }: QueryFunctionContext<JobsQueryKey>) => {
    const [, page] = queryKey; // Destructure page from queryKey
    const response = await fetch(`http://localhost:5001/orders?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["jobs", page] as JobsQueryKey, // Cast queryKey to the correct type
    queryFn: fetchJobs,
  });
};

