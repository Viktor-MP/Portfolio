/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useRef, useState, FormEvent, useEffect, ChangeEvent } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { RootState } from "src/reduxState/_store";
import { useSelector, useDispatch } from "react-redux";

import {
    registerTypes,
    formContentType,
    formContentValidate,
} from "../../types";

import GClass from "../Global.module.scss";
import Styles from "../Style.module.scss";
import classNames from "classnames";

import { initial_formContent } from "../../utils/register_utils";

import { useRegisterContext } from "../../contexts/registered_context";
import { SignInput } from "../_Atoms/index";

import { validate } from "../../validation/index";
import { checkAuth, login, registration } from "src/services/AuthService";

import { providerPath as path } from "../../routingPath";

import { setMode } from "src/reduxState/lightModeSlice";

const Registration: FC<registerTypes> = ({ state, comp_name }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<formContentValidate>({});
    const [formContent, setFormContent] =
        useState<formContentType>(initial_formContent);

    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const { setRegister } = useRegisterContext();

    useEffect(() => {
        const localModeState = localStorage.getItem("isLightMode");
        if (localModeState === "true") dispatch(setMode(true));
        else if (localModeState === "false") dispatch(setMode(false));

        if (localStorage.getItem("token")) {
            checkAuth().then((res) => {
                if (res?.status === 200) {
                    setRegister({
                        userName: res.data.user.userName,
                        isAuth: res.data.user.isActivated,
                    });
                    navigate(path.todoBoard(), { replace: true });
                }
            });
        }

        setLoading(!loading);
    }, []);

    useEffect(() => {
        formContent.userName &&
            state === "Sign Up" &&
            validate(formContent).then((user) => setErrors({ ...user }));
    }, [formContent]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const formContent_handler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (timeoutRef.current) {
            setErrors({});
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

            const token = userData.data.accessToken;
            const name = userData?.data?.user?.userName || "";
            token && localStorage.setItem("token", token);

            setRegister({
                userName: name,
                isAuth: true,
            });
            navigate(path.todoBoard(), { replace: true });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data.message);
                const errorName = err.response?.data.name;
                setErrors({
                    [errorName]: err.response?.data.message,
                    error: err.response?.data.message,
                });
            } else {
                setErrors({
                    error: "An error occurred during registration.",
                });
            }
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

                const token = userRegister.data.accessToken;
                const name = userRegister?.data?.user?.userName || "";
                token && localStorage.setItem("token", token);

                setRegister({
                    userName: name,
                    isAuth: true,
                });
                navigate(path.todoBoard(), { replace: true });
            }
        } catch (err) {
            console.log("An unexpected error occurred:", err);
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data.message);
                const errorName = err.response?.data.name;
                setErrors({
                    [errorName]: err.response?.data.message,
                    error: err.response?.data.message,
                });
            } else {
                setErrors({
                    error: "An error occurred during registration.",
                });
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <main
            className={` ${GClass["flex_col_cen"]} min-h-dvh gap-8 ${classNames(
                {
                    [Styles["comp_light"]]: mode,
                    [Styles["comp_dark"]]: !mode,
                }
            )}`}
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
                className={`${GClass["flex_col_cen"]} grid-cols-2 w-1/4 gap-6`}
            >
                <SignInput
                    id="userName"
                    state={state}
                    required={true}
                    hold="user name"
                    error={errors.userName}
                    change={formContent_handler}
                />

                <SignInput
                    state={state}
                    id="userPass"
                    hold="password"
                    type="password"
                    required={true}
                    error={errors.userPass}
                    change={formContent_handler}
                />
                {state === "Sign Up" && (
                    <SignInput
                        state={state}
                        id="checkPass"
                        type="password"
                        required={true}
                        hold="repeat password"
                        error={errors.checkPass}
                        change={formContent_handler}
                    />
                )}
                {errors.error && <p>{errors.error}</p>}

                <button className={`${Styles["signRef"]}`} type="submit">
                    {state}
                </button>
            </form>
        </main>
    );
};

export default Registration;
