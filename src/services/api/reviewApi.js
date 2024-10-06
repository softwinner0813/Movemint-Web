import axiosInstance from "./axiosInstance";
// Export API methods
export const getReviewsByMoverId = async (moverId) => {
    const response = await axiosInstance.post("/review/getReviewByMoverId", { moverId });
    if (response.data.result)
        return response.data.data;
    else
        return null;
};