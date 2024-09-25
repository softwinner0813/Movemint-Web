import axiosInstance from "./axiosInstance";

export const submitProposal = async (formData) => {
    const response = await axiosInstance.post("/proposal/submit", formData);
    return response.data;
};

export const getSubmittedProposal = async (project_id, mover_id) => {
    const response = await axiosInstance.post("/proposal/getSubmitted", { project_id, mover_id });
    return response.data;
}