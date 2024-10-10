const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include", // include cookies in the request
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody.data;
};
