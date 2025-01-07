import axiosInstance from "./axiosInstance";
// Export API methods
export const getMoverTemplates = async (moverId) => {
  const response = await axiosInstance.get(`/contract-template/${moverId}`);
  if (response.data.result) return response.data.data;
  else return null;
};

export const deleteTemplate = async (id) => {
  const response = await axiosInstance.delete(`/contract-template/${id}`);
  if (response.data.result) return response.data;
  else return null;
};

export const uploadTemplate = async (formData) => {
  const response = await axiosInstance.post(
    `/contract-template/uploadTemplate`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Set the correct content type
      },
    }
  );
  if (response.data.result) return response.data.data;
  else return null;
};
