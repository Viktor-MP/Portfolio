import { FC } from "react";
import Nav from "./ChildPorts/Nav_Port/Nav";
import { Outlet } from "react-router-dom";

import Classes from "./Main.module.scss";
import classNames from "classnames";
import NavBurger from "../NavBurger/NavBurger";
import {mainPropsType } from "../UtilsComp/main/main_Types";
// import { registeredAs } from "../UtilsComp/main/main_utils";

// import { Sling as Hamburger } from "hamburger-react";

const MainPortfolio: FC<mainPropsType> = ({ className = "" }) => {
    
    return (
        <section
            className={classNames({
                [className]: className,
                [Classes["action"]]: !className,
            })}
        >
            <NavBurger />

            hello
            <Nav />


            <Outlet />
        </section>
    );
};

export default MainPortfolio;
