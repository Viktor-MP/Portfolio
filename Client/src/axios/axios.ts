import axios, { AxiosError } from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_URL,
});

// Add a request interceptor
$api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            "token"
        )}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
$api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle the error here
        if (!error.response) {
            // Network error (no response received)
            console.error("Network Error:", error);
            alert(
                "Network error, please check your internet connection or try again later."
            );
        }
        return Promise.reject(error);
    }
);

function isAxiosError(error: any): error is AxiosError<{ error: string }> {
    return (
        axios.isAxiosError(error) &&
        typeof error.response?.data?.error === "string"
    );
}


export { isAxiosError, $api };
