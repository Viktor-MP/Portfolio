import { ChangeEvent } from "react";

export interface registerTypes {
    className?: string;
    state: string;
    comp_name: string
}

export interface formContentType {
    userName: string;
    userPass: string;
    checkPass?: string;
}


export interface formContentValidate {
    userPass?: string;
    checkPass?: string;
    userName?: string;
    error? : string
}


export interface input_Types {
    className?: string;
    required?: boolean
    type?: string;
    state?: string;
    error: string | undefined;
    hold: string;
    id: string;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface input_utilsType {
    signIn: input_Types[];
}

export {};
