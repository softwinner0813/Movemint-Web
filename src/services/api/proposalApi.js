import axiosInstance from "./axiosInstance";

export const submitProposal = async (formData) => {
    const response = await axiosInstance.post("/proposal/submit", formData);
    return response.data;
};

export const updateProposal = async (formData) => {
    const response = await axiosInstance.post("/proposal/update", formData);
    return response.data;
};

export const updateProposalDocument = async (formData) => {
    const response = await axiosInstance.post("/proposal/updateProposal", formData);
    return response.data;
}

export const getSubmittedProposal = async (project_id, mover_id) => {
    const response = await axiosInstance.post("/proposal/getSubmitted", { project_id, mover_id });
    return response.data;
}

export const getOrderHistoryByMoverId = async (mover_id) => {
    const response = await axiosInstance.post("/proposal/getOrderHistoryByMoverId", { mover_id });
    return response.data;
}

export const getProposalByID = async (proposal_id) => {
    const response = await axiosInstance.post("/proposal/getProposalByID", { proposal_id });
    return response.data;
}

export const sendShareLink = async (proposal_id, link) => {
    const response = await axiosInstance.post("/proposal/sendShareLink", { proposal_id, link });
    return response.data;
}

export const uploadProposalPDF = async (formData) => {
    const response = await axiosInstance.post("/proposal/upload-pdf", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};