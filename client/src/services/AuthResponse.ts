export type IUsers = {
    userName: string;
    id: number;
    isActivated: boolean;
}

export type IUser = {
    key: "userName" | "token" | "password";
    value: string;
};

export type UserExMess = {
    error: string;
};

export type Data = {
    message: string;
    status: number;
};
export type ErrorData = {
    data: Data;
};

export type AuthResponse = {
    accessToken?: string;
    user?: IUsers;
    error?: string;
    message?: string;
    status?: number;
};
