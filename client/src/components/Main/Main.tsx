/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { FC, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

import { Nav } from "../_Molecules/index";

import Classes from "./Main.module.scss";
import classNames from "classnames";
import { mainPropsType } from "../../types";
import { useRegisterContext } from "../../contexts/registered_context";
import { checkAuth } from "src/services/AuthService";
import { setMode } from "src/reduxState/lightModeSlice";
import { RootState } from "src/reduxState/store";

const MainPortfolio: FC<mainPropsType> = ({ className = "" }) => {
    const { setRegister } = useRegisterContext();
    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
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
                }
            });
        }
    }, []);

    return (
        <section
            className={classNames({
                [className]: className,
                [Classes["action"]]: !className,
            })}
        >
            <Nav mode={mode} />
            <Outlet />
        </section>
    );
};

export default MainPortfolio;
