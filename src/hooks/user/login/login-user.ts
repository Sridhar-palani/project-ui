import { login } from "@/hooks/user/login/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};
