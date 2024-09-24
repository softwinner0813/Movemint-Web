import axiosInstance from "./axiosInstance";
// Export API methods
export const signupMover = async (data) => {
    const response = await axiosInstance.post("/auth/signup/mover", data);
    const token = response.data.data.token;

    // Store the token in localStorage (or sessionStorage)
    if (token) {
      localStorage.setItem("x-auth-token", token);
    }
    return response.data;
};

export const updateMover = async (id, data) => {
    const response = await axiosInstance.post("/mover/updateMover", { id, updates: data });
    return response.data;
}

export const signinMoverWithGoogle = async (data) => {
    const response = await axiosInstance.post("/auth/signWithGoogle/mover", data);
    const token = response.data.data.token;

    // Store the token in localStorage (or sessionStorage)
    if (token) {
      localStorage.setItem("x-auth-token", token);
    }
    return response.data;
}

export const signinMover = async (data) => {
    const response = await axiosInstance.post("/auth/signin/mover", data);
    const token = response.data.data.token;

    // Store the token in localStorage (or sessionStorage)
    if (token) {
      localStorage.setItem("x-auth-token", token);
    }
    return response.data;
}

export const checkAuth = async () => {
  const response = await axiosInstance.post("/auth/checkAuth");
  return response.data;
}