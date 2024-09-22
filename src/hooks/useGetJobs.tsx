import { useQuery } from "@tanstack/react-query";

export const useGetJobs = () => {
  const fetchJobs = async () => {
    const response = await fetch("http://localhost:5001/orders");
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
};
