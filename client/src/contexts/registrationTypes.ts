import React, { ReactNode } from "react";



export type Register = {
    
    userName: "guest" | string
    isAuth: boolean
};

 export type registerContextTypeProps = {
    children: ReactNode
}


export type registerContext = {
    register: Register;
    setRegister: React.Dispatch<React.SetStateAction<Register>>;
};
export {}