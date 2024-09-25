import axiosInstance from "./axiosInstance";
// Export API methods
export const getProjects = async () => {
    const response = await axiosInstance.get("/project/open");
    if (response.data.result)
        return response.data.data;
    else
        return null;
};

export const getProjectById = async (id) => {
    const response = await axiosInstance.get(`/project/${id}`);
    console.log(response);
    if (response.data.result)
        return response.data.data;
    else
        return null;
};