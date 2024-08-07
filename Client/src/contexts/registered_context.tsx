"use client";

import { createContext, useContext, useState } from "react";
import {
    navOpenContext,
    navOpenType,
} from "./contextTypes/index";
import {
    registerContextTypeProps,
    registerContext,
    Register,
} from "./contextTypes/index";

export const Register_context = createContext<registerContext | null>(null);
export const NavOpen_context = createContext<navOpenContext | null>(null);

const RegisterContextProvider = ({ children }: registerContextTypeProps) => {
    const [register, setRegister] = useState<Register>({
        userName: "guest",
        isAuth: false,
    });
    const [navOpen, setNavOpen] = useState<navOpenType>({
        state: false,
    });

    return (
        <Register_context.Provider
            value={{
                register,
                setRegister,
            }}
        >
            <NavOpen_context.Provider
                value={{
                    navOpen,
                    setNavOpen,
                }}
            >
                {children}
            </NavOpen_context.Provider>
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

export const useOpenContext = () => {
    const context = useContext(NavOpen_context);
    if (!context) {
        throw new Error(
            "useOpenContext must be used within a RegisterContextProvider"
        );
    }
    return context
}

export default RegisterContextProvider;
