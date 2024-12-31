import axiosInstance from "./axiosInstance";
// Export API methods
export const getTeamMember = async (moverId) => {
    const response = await axiosInstance.post("/team/get", {id: moverId});
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
    const response = await axiosInstance.post("/team/delete", {id: data});
    if (response.data.result)
        return response.data.data;
    else
        return null;
};