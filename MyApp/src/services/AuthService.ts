import { formContentType } from "../components/Registration/register_Types";
import { AuthResponse } from "../modules/response/AuthResponse";

import $api from "../axios/axios";
import axios from "axios";
import { AxiosResponse } from "axios";

const login = async (
    form: formContentType
): Promise<AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>("/login", form);
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
        const response = await axios.get<AuthResponse>(
            process.env.REACT_APP_URL + "/refresh",
            { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export { login, registration, logout, checkAuth };
