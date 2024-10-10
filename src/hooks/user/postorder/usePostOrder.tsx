import { useMutation } from "@tanstack/react-query";
import { create } from "./fetcher";

export const usePostOrder = () => {
  return useMutation({
    mutationFn: create,
    onSuccess: (data: string) => {
      const message = data;
    },
    onError: (error: string) => {
      const errorMessage = error;
    },
  });
};
