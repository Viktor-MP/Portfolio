import { IUsers, IUser, UserExMess } from "./AuthResponse";

import { $api } from "../axios";
import { AxiosResponse } from "axios";

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
