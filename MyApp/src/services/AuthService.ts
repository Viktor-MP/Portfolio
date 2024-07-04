import { formContentType } from "../Components/Registration/register_Types";
import { AuthResponse, ErrorData } from "../modules/response/AuthResponse";

import $api from "../axios/axios";
import axios from "axios";
import { AxiosResponse } from "axios";

const login = async (
    form: formContentType
): Promise<AxiosResponse<AuthResponse> | undefined> => {
    try {
        const response = await $api.post<AuthResponse>("/login", form);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response;
        }
    }
};

const registration = async (
    form: formContentType
): Promise<AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>("/registration", form);
};

const logout = async (): Promise<void> => {
    return $api.post("/logout");
};

const checkAuth = async () => {
    try {
        const response = await axios.get(
            process.env.REACT_APP_URL + "/refresh",
            { withCredentials: true }
        );
        console.log(response);
        localStorage.setItem("token", response.data.accessToken);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export { login, registration, logout, checkAuth };
