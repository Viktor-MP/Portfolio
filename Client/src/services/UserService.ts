import { IUsers, IUser, UserExMess } from "../types/auth_Types";

import { $api } from "../axios";
import { AxiosResponse } from "axios";

const fetchUsers = async (): Promise<AxiosResponse<IUsers[]>> => {
    return $api.get<IUsers[]>("/users");
};

const fetchUser = async ({
    key,
    value,
}: IUser): Promise<AxiosResponse<UserExMess>> => {
    // console.log("fetching user");
    // console.log(key, value)
    try {
        const res = await $api.post<UserExMess>("/candidate/exists", {
            key,
            value,
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { fetchUsers, fetchUser };
