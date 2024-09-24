import axios from "axios";

// Base API instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api", // Adjust this according to your environment
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
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

export default axiosInstance;