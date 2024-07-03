import { formContentType } from "../Components/Registration/register_Types";
import {
    AuthResponse,
    IUsers,
    IUser,
    UserExMess,
} from "../modules/response/AuthResponse";

import $api from "../axios/axios";
import { AxiosResponse, isAxiosError } from "axios";

const fetchUsers = async (): Promise<AxiosResponse<IUsers[]>> => {
    return $api.get<IUsers[]>("/users");
};

const fetchUser = async ({
    key,
    value,
}: IUser): Promise<AxiosResponse<UserExMess>> => {
    console.log("fetching user");

    return $api.post<UserExMess>("/candidate/exists", { key, value });
};

export { fetchUsers, fetchUser };
