/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxState/store";
import ClassesComb from "../../globalClasses/globalClasses";
import {
    formContentType,
    formContentValidate,
    registerTypes
} from "../UtilsComp/register/register_Types";
import Sign_input from "../Sign_input/Sign_input";
import { initial_formContent } from "../UtilsComp/register/register_utils";

import Styles from "../../Styles.module.scss";


const Registration: FC<registerTypes> = ({ state, comp_name }) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [errors, setErrors] = useState<formContentValidate>({});

    const register = useSelector(
        (state: RootState) => state.isRegistered.registered
    );
    const registeredAs = useSelector(
        (state: RootState) => state.isRegistered.as
    );
    // console.log(register, registeredAs);

    const [formContent, setFormContent] =
        useState<formContentType>(initial_formContent);

    const formContent_handler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setFormContent({
                ...formContent,
                [`${e.target.name}`]: newValue,
            });
        }, 1000);
    };

    const validate = (form: formContentType) => {
        console.log(1);
        const newErrors: Partial<formContentValidate> = {};
        const passwordRegex = /^(?=.*\d)(?=.*[-._])[A-Za-z\d-._]{6,16}$/;
        const userNameRegex = /^(?=.*[A-Z])[-._a-zA-Z0-9]{4,25}$/;
        const standard =
            "at least \n 1 lowercase, 1 uppercase, 1 number, and 1 special character in (._-)";

        if (form.userName && !userNameRegex.test(form.userName)) {
            newErrors.userName = `Nickname must be between 4 - 25 characters that can contain  ${standard} and it should be unique for each user`;
        }

        if (form.userPass && !passwordRegex.test(form.userPass)) {
            newErrors.userPass = `Password must be between 6 - 16 characters that include ${standard}`;
        }

        if (
            form.checkPass &&
            ((form.checkPass && !passwordRegex.test(form.checkPass)) ||
                form.userPass !== form.checkPass)
        ) {
            newErrors.checkPass = "Passwords should match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendRegisteredDataToDB = async (
        e: FormEvent<HTMLFormElement | HTMLButtonElement>,
        form: formContentType
    ) => {
        e.preventDefault();
        const url = "http://localhost:3000/api/registration";
        console.log(JSON.stringify(form));
        const values = Object.values(form);

        try {
            if (values.every((val) => !!val)) {
                console.log("true");

                const response = await fetch(url, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(form), // body data type must match "Content-Type" header
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log(response)
                const data = await response.json();

                // console.log(data, response.json());
                return data; // parses JSON response into native JavaScript objects
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        validate(formContent);
    }, [formContent]);

    return (
        <main
            className={` bg-primary min-h-dvh ${ClassesComb["flex_col_cen"]} min-h-dvh gap-6`}
        >
            <h2 className={`text-3xl ${Styles["heading_anim"]}`}>
                {comp_name}
            </h2>
            <form
                onSubmit={(e) => sendRegisteredDataToDB(e, formContent)}
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
