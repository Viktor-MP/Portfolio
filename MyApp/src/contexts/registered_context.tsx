"use client";

import { createContext, useContext, useState } from "react";
import {
    Register,
    registerContext,
    registerContextTypeProps,
} from "./contextTypes";

export const Register_context = createContext<registerContext | null>(null);

const RegisterContextProvider = ({ children }: registerContextTypeProps) => {
    const [register, setRegister] = useState<Register>({
        userName: "guest",
        isAuth: false
    });

    return (
        <Register_context.Provider
            value={{
                register,
                setRegister,
            }}
        >
            {children}
        </Register_context.Provider>
    );
};

export const useRegisterContext = () => {
    const context = useContext(Register_context);
    if (!context) {
        throw new Error(
            "useRegisterContext must be used within a RegisterContextProvider"
        );
    }

    return context;
};

export default RegisterContextProvider;
