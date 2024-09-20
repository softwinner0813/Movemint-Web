// src/services/api.js
import axios from "axios";

// Base API instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api", // Adjust this according to your environment
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage (or sessionStorage)
        const token = localStorage.getItem("x-auth-token");

        if (token) {
            // Add the x-auth token to the headers if it exists
            config.headers["x-auth"] = token;
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Export API methods
export const signupMover = async (data) => {
    const response = await api.post("/auth/signup/mover", data);
    const token = response.data.data.token;

    // Store the token in localStorage (or sessionStorage)
    if (token) {
      localStorage.setItem("x-auth-token", token);
    }
    return response.data;
};

export const updateMover = async (id, data) => {
    const response = await api.post("/mover/updateMover", { id, updates: data });
    return response.data;
}

export const signinMover = async (data) => {
    const response = await api.post("/auth/signWithGoogle/mover", data);
    const token = response.data.data.token;

    // Store the token in localStorage (or sessionStorage)
    if (token) {
      localStorage.setItem("x-auth-token", token);
    }
    return response.data;
}