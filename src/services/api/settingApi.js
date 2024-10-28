import axiosInstance from "./axiosInstance";
// Export API methods
export const sendSupportEmail = async (data) => {
  const response = await axiosInstance.post("/mover/sendSupportEmail", { data });
  if (response.data.result)
    return response.data.data;
  else
    return null;
};