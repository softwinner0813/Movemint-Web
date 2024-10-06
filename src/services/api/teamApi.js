import axiosInstance from "./axiosInstance";
// Export API methods
export const getTeamMember = async () => {
    const response = await axiosInstance.get("/team/get");
    if (response.data.result)
        return response.data.data;
    else
        return null;
};

export const createTeamMember = async (data) => {
    const response = await axiosInstance.post("/team/create", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    if (response.data.result)
        return response.data.data;
    else
        return null;
};

export const updateTeamMember = async (data) => {
    const response = await axiosInstance.put("/team/update", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    if (response.data.result)
        return response.data.data;
    else
        return null;
};

export const deleteTeamMember = async (data) => {
    const response = await axiosInstance.delete("/team/delete", data);
    if (response.data.result)
        return response.data.data;
    else
        return null;
};