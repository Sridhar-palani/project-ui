import { FormValues } from "@/components/CreateForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const create = async (formData: FormValues) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
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
