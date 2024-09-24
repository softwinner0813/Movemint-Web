import axiosInstance from "./axiosInstance";

export const submitProposal = async (formData) => {
    const response = await axiosInstance.post("/proposal/submit", formData);
    if (response.result)
        return true;
    else
        return null;
};