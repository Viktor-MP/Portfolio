import { FC, useLayoutEffect } from "react";
import Nav from "./ChildPorts/Nav_Port/Nav";
import { Outlet, useLocation } from "react-router-dom";

import Classes from "./Main.module.scss";
import classNames from "classnames";
import NavBurger from "../NavBurger/NavBurger";
import { mainPropsType } from "../UtilsComp/main/main_Types";
import { useRegisterContext } from "../../contexts/registered_context";
// import { registeredAs } from "../UtilsComp/main/main_utils";

// import { Sling as Hamburger } from "hamburger-react";

const MainPortfolio: FC<mainPropsType> = ({ className = "" }) => {
    const { register, setRegister } = useRegisterContext();
    const location = useLocation();
    useLayoutEffect(() => {
        console.log(register);
        console.log("hello portfolio");

        // return () => {
        //     // This code will run when the component is unmounted
        //     console.log("About component unmounted");
        // };
    }, [location]);

    return (
        <section
            className={classNames({
                [className]: className,
                [Classes["action"]]: !className,
            })}
        >
            <NavBurger />
            {register}
            <Nav />
            <Outlet />
        </section>
    );
};

export default MainPortfolio;
