import axiosInstance from "./axiosInstance";
// Export API methods
export const getInvoiceByProposalId = async (id) => {
    const response = await axiosInstance.post("/payment/getInvoiceByProposalId", {proposal_id: id});
    if (response.data.result)
        return response.data.data;
    else
        return null;
};