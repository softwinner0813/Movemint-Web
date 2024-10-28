import axiosInstance from "./axiosInstance";
// Export API methods
export const getInvoiceByProposalId = async (id) => {
    const response = await axiosInstance.post("/payment/getInvoiceByProposalId", {proposal_id: id});
    if (response.data.result)
        return response.data.data;
    else
        return null;
};

export const createConnectAccount = async (userId, email, companyName) => {
    const response = await axiosInstance.post("/payment/createConnectAccount", {userId, email, companyName});
    if (response.data.result)
        return response.data;
    else
        return null;
}

export const deleteConnectAccount = async (mover_id) => {
    const response = await axiosInstance.post("/payment/deleteConnectAccount", {mover_id});
    if (response.data.result)
        return response.data;
    else
        return null;
}


export const createAccountLink = async (accountId) => {
    const response = await axiosInstance.post("/payment/createAccountLink", {accountId});
    if (response.data.result)
        return response.data;
    else
        return null;
}

export const createDashboardLink = async (accountId) => {
    const response = await axiosInstance.post("/payment/createDashboardLink", {accountId});
    if (response.data.result)
        return response.data;
    else
        return null;
}