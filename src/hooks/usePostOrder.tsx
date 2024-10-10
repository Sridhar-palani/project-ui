import { useMutation } from "@tanstack/react-query";

export const usePostOrder = () => {
  const postJobs = async (values: any) => {
    const response = await fetch(`http://localhost:5001/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    return response.json();
  };

  return useMutation({
    mutationKey: ["jobs"],
    mutationFn: postJobs,
  });
};
