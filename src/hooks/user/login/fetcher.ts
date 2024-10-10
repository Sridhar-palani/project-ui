import { SignInFormData } from "@/Pages/SignIn";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const login = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include", // include cookies in the request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody.data;
};
