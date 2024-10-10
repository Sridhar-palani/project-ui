import { useAppContext } from "@/contexts/AppContext";
import { logout } from "@/hooks/user/logout/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] }); // Wait for this to finish
      showToast({ message: "Logged out successfully", type: "SUCCESS" });
      navigate("/");
    },
  });
};
