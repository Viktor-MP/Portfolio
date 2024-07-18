import { formContentType } from "../types/register_Types";
import { AuthResponse, ErrorData } from "../types/auth_Types";

import { $api } from "../axios";
import axios, { AxiosResponse } from "axios";

const login = async (
    form: formContentType
): Promise<AxiosResponse<AuthResponse>> => {
    try {
        return await $api.post<AuthResponse>("/login", form);
    } catch (error) {
        throw error;
    }
};

const registration = async (
    form: formContentType
): Promise<AxiosResponse<AuthResponse>> => {
    try {
        return $api.post<AuthResponse>("/registration", form);
    } catch (error) {
        throw error;
    }
};

const logout = async (): Promise<void> => {
    return $api.post("/logout");
};

const checkAuth = async () => {
    try {
        console.log("try");

        const response = await axios.get(
            process.env.REACT_APP_URL + "/refresh",
            { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);
        return response;
    } catch (error) {
        console.log("catch")
        throw error;
    }
};

export { login, registration, logout, checkAuth };
