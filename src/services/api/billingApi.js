import axiosInstance from "./axiosInstance";
// Export API methods
export const getBillingsByUserId = async (id) => {
    const response = await axiosInstance.post("/billing/getBillingsByUserId", { id });
    if (response.data.result)
        return response.data.data;
    else
        return null;
};

export const createPaymentIntent = async (billingId, amount, currency) => {
  const response = await axiosInstance.post("/billing/createPaymentIntent", { billingId, amount, currency });
  return response.data
};

export const updateBilling = async (billingId, updates) => {
  const response = await axiosInstance.post("/billing/update", { billingId, updates });
  return response.data;
};