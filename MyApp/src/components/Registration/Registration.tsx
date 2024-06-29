/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../reduxState/store";
import ClassesComb from "../../globalClasses/globalClasses";
import {
    formContentType,
    formContentValidate,
    registerTypes,
} from "../UtilsComp/register/register_Types";

import Sign_input from "../Sign_input/Sign_input";
import { initial_formContent } from "../UtilsComp/register/register_utils";

import Styles from "../../Styles.module.scss";
import { useRegisterContext } from "../../contexts/registered_context";
import { useNavigate } from "react-router-dom";
import { validate } from "./formValidate";
import { fetchUser } from "src/services/UserService";
import { login, registration } from "src/services/AuthService";

const Registration: FC<registerTypes> = ({ state, comp_name }) => {
    console.log(state);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [errors, setErrors] = useState<formContentValidate>({});
    const navigate = useNavigate();

    // const register = useSelector(
    //     (state: RootState) => state.isRegistered.registered
    // );
    // const registeredAs = useSelector(
    //     (state: RootState) => state.isRegistered.as
    // );

    const { register, setRegister } = useRegisterContext();
    // console.log(register, registeredAs);

    const [formContent, setFormContent] =
        useState<formContentType>(initial_formContent);

    const formContent_handler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
            () => {
                setFormContent({
                    ...formContent,
                    [`${e.target.name}`]: newValue,
                });
            },
            state === "Sign Up" ? 1000 : 10
        );
    };

    const loginSurv = async (
        e: FormEvent<HTMLFormElement | HTMLButtonElement>,
        form: formContentType
    ) => {
        e.preventDefault();
        try {
            const userData = await login(form);
            console.log(userData)
            localStorage.setItem("token", userData.data.accessToken);

            if (userData.status >= 200 && userData.status < 300) {
                setRegister({
                    userName: userData.data.user.userName,
                    isAuth: true,
                });
                navigate("/portfolio", { replace: true });
            }
        } catch (error) {
            console.log(error)
            setErrors({
                error: "An error occurred during registration.",
            });
        }
    };

    const registrationSurv = async (
        e: FormEvent<HTMLFormElement | HTMLButtonElement>,
        form: formContentType
    ) => {
        e.preventDefault();

        const errorValues = Object.values(errors);

        try {
            if (!errorValues.length) {
                const userRegister = await registration(form);
                console.log(userRegister)
                if (userRegister.status >= 200 && userRegister.status < 300) {
                    localStorage.setItem(
                        "token",
                        userRegister.data.accessToken
                    );
                    setRegister({
                        userName: userRegister.data.user.userName,
                        isAuth: true,
                    });
                    navigate("/portfolio", { replace: true });
                }

                if (
                    userRegister?.status >= 400 &&
                    userRegister?.status <= 500
                ) {
                    setErrors({ error: userRegister.data.error });
                } else if (userRegister?.status >= 500) {
                    setErrors({
                        error: "An error occurred during registration.",
                    });
                }
            }
        } catch (error) {
            console.log(error);
            console.log("An unexpected error occurred:", error);
        }
    };

    useEffect(() => {
        formContent.userName &&
            state === "Sign Up" &&
            setErrors(validate(formContent));
    }, [formContent]);

    const isUserExists = async () => {
        try {
            const user = await fetchUser({
                key: "userName",
                value: formContent.userName,
            });
            setErrors({ userName: user.data.error });
        } catch (error) {
            console.log("An unexpected error occurred:", error);
        }
    };

    useEffect(() => {
        formContent.userName && state === "Sign Up" && isUserExists();
        // console.log(formContent.userName);
    }, [formContent.userName]);

    return (
        <main
            className={` bg-primary min-h-dvh ${ClassesComb["flex_col_cen"]} min-h-dvh gap-6`}
        >
            <h2 className={`text-3xl ${Styles["heading_anim"]}`}>
                {comp_name}
            </h2>
            <form
                onSubmit={
                    state === "Sign Up"
                        ? (e) => registrationSurv(e, formContent)
                        : (e) => loginSurv(e, formContent)
                }
                className={`${ClassesComb["flex_col_cen"]} grid-cols-2 w-1/4 gap-3`}
            >
                <Sign_input
                    error={errors.userName}
                    hold="user name"
                    id="userName"
                    required={true}
                    state={state}
                    change={formContent_handler}
                />

                <Sign_input
                    error={errors.userPass}
                    change={formContent_handler}
                    hold="password"
                    required={true}
                    state={state}
                    id="userPass"
                    type="password"
                />
                {state === "Sign Up" && (
                    <Sign_input
                        error={errors.checkPass}
                        change={formContent_handler}
                        hold="repeat password"
                        required={true}
                        state={state}
                        id="checkPass"
                        type="password"
                    />
                )}
                {errors.error && <p>{errors.error}</p>}

                <button
                    className={`${ClassesComb["submit_btn"]}`}
                    type="submit"
                >
                    {state}
                </button>
            </form>
        </main>
    );
};

export default Registration;
