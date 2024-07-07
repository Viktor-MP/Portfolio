import React, { ReactNode } from "react";

type Register = {
    userName: "guest" | string;
    isAuth: boolean;
};

type registerContextTypeProps = {
    children: ReactNode;
};

type registerContext = {
    register: Register;
    setRegister: React.Dispatch<React.SetStateAction<Register>>;
};

export type { registerContext, registerContextTypeProps, Register };
