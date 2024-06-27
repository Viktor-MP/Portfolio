import { formContentType } from "../components/UtilsComp/register/register_Types";
import { AuthResponse } from "../modules/response/AuthResponse";

import $api from "../axios/axios";
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

const logout = async(): Promise<void> => {
    return $api.post("/logout")
}

export { login, registration, logout };
