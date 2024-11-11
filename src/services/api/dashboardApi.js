import axiosInstance from "./axiosInstance";
// Export API methods
export const getDashboard = async (moverId) => {
    const response = await axiosInstance.post("/dashboard", { moverId });
    if (response.data.result)
        return response.data;
    else
        return null;
};

export const getTransactionsByDate = async (start_date, end_date, moverId) => {
  const response = await axiosInstance.post("/dashboard/getTransactionsByDate", { start_date, end_date, moverId });
  return response.data;
}