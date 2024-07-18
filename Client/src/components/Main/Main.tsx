/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { FC, Suspense, startTransition, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Nav } from "../_Molecules/index";

import Classes from "./Main.module.scss";
import classNames from "classnames";
import { mainPropsType } from "../../types";
import { useRegisterContext } from "../../contexts/registered_context";
import { checkAuth } from "src/services/AuthService";
import { setMode } from "src/reduxState/lightModeSlice";
import { RootState } from "src/reduxState/_store";
import axios from "axios";

const MainPortfolio: FC<mainPropsType> = ({ className = "" }) => {
    const { setRegister } = useRegisterContext();
    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const dispatch = useDispatch();

   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const localModeState = localStorage.getItem("isLightMode");
        if (localModeState === "true") dispatch(setMode(true));
        else if (localModeState === "false") dispatch(setMode(false));

        const fetchData = async () => {
            try {
                if (localStorage.getItem("token")) {
                    await checkAuth().then((res) => {
                        startTransition(() => {
                            if (res?.status === 200) {
                                setRegister({
                                    userName: res.data.user.userName,
                                    isAuth: res.data.user.isActivated,
                                });
                            }
                        });
                    });
                }
            } catch (error) {
                if (axios.isAxiosError(error) && !error.response) {
                    setError(
                        "Network error, please check your internet connection or try again later."
                    );
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section
            className={classNames({
                [className]: className,
                [Classes["action"]]: !className,
            })}
        >
            <Nav mode={mode} />

            <Suspense fallback={<p>Loading...</p>}>
                <Outlet />
            </Suspense>
        </section>
    );
};

export default MainPortfolio;
