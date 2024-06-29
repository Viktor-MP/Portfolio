import { FC, useEffect } from "react";
import Nav from "./ChildPorts/Nav_Port/Nav";
import { Outlet } from "react-router-dom";

import Classes from "./Main.module.scss";
import classNames from "classnames";
import NavBurger from "../NavBurger/NavBurger";
import { mainPropsType } from "../UtilsComp/main/main_Types";
import { useRegisterContext } from "../../contexts/registered_context";
import { checkAuth } from "src/services/AuthService";


const MainPortfolio: FC<mainPropsType> = ({ className = "" }) => {


    const { register, setRegister } = useRegisterContext();

    useEffect(() => {
        console.log(localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            console.log("item");
            checkAuth().then((res) => {
                if (res?.status === 200) {
                    console.log(res);
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
            <NavBurger />
            {register.userName}
            <Nav />
            <Outlet />
        </section>
    );
};

export default MainPortfolio;
