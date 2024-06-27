export interface IUsers {
    userName: string
    id: number
    isActivated: boolean
}


export type IUser = {
    key: "userName" | "token" | "password"
    value: string;
}

export interface UserExMess {
    error: string
}

export interface AuthResponse {
    accessToken: string
    user: IUsers
    error?: string
}
