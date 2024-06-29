import React from "react";



export type Register = {
    
    userName: "guest" | string
    isAuth: boolean
};

 export type registerContextTypeProps = {
    children: React.ReactNode
}


export type registerContext = {
    register: Register;
    setRegister: React.Dispatch<React.SetStateAction<Register>>;
};
export {}