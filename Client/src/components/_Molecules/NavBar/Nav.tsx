/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FC } from "react";

import Classes from "./Nav.module.scss";
import classNames from "classnames";

import { logout } from "src/services/AuthService";
import {
    useOpenContext,
    useRegisterContext,
} from "src/contexts/registered_context";
import { providerPath as path } from "../../../routingPath";


import { nav_utils as navigation } from "../../../utils";
import { NavCompTypes } from "../../../types";

const Nav: FC<NavCompTypes> = ({ className, mode }) => {
    const { register, setRegister } = useRegisterContext();
    const navigate = useNavigate();

    const { navOpen, setNavOpen } = useOpenContext();

    const logoutHandler = async () => {
        try {
            const userLogout = await logout();
            localStorage.removeItem("token");
            setRegister({
                userName: "guest",
                isAuth: false,
            });
            // console.log(userLogout)
            navigate(path.base, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const navBarHandler = () => setNavOpen({ state: !navOpen.state });

    return (
        <nav
            className={`${classNames({
                [Classes["nav_light"]]: mode,
                [Classes["nav_dark"]]: !mode,
                [`${className}`]: className,
                ["open"]: navOpen.state,
            })}`}
        >
            <div
                className={`${classNames({
                    [Classes["navList"]]: !className,
                })}`}
            >
                <ul
                    className={classNames({
                        ["flex flex-col"]: !className,
                    })}
                >
                    {navigation.map((nav) => (
                        <li key={nav.appName}>
                            <Link to={nav.appRoot}>{nav.appName}</Link>
                        </li>
                    ))}
                </ul>

                <ul
                    className={classNames({
                        ["flex flex-col"]: !className,
                    })}
                >
                    <li>
                        <Link to={path.settings()}>Settings</Link>
                    </li>
                    <li>
                        {!register.isAuth ? (
                            <Link to={path.signIn()}> Log in </Link>
                        ) : (
                            <button onClick={logoutHandler}>Log out</button>
                        )}
                    </li>
                </ul>
            </div>
            <div
                className={` ${classNames({
                    [Classes["navController"]]: !className,
                })}`}
            >
                <span
                    className={`${classNames({
                        [Classes["scale-1"]]: navOpen.state,
                    })}`}
                    onClick={navBarHandler}
                >
                    <IoIosArrowDroprightCircle />
                </span>
            </div>
        </nav>
    );
};

export default Nav;
