import { register } from "@/hooks/user/register/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
    },
  });
};
