import { useQuery } from "@tanstack/react-query";

export const useGetJobsById = (id: string | undefined) => {
  const fetchJobs = async () => {
    const response = await fetch(`http://localhost:5000/orders/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
};
