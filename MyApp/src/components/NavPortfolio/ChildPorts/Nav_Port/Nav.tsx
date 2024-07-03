import React, { FC, useEffect } from "react";
import nav_utils from "./nav_utils";
import { Link, useNavigate } from "react-router-dom";
import Classes from "../../Main.module.scss";
import classNames from "classnames";
import { checkAuth, logout } from "src/services/AuthService";
import { useRegisterContext } from "src/contexts/registered_context";
import { providerPath as path } from "../../../../indexPath";

const Nav: FC<{ className?: string }> = ({ className = "" }) => {
    const { register, setRegister } = useRegisterContext();
    const navigate = useNavigate();
    console.log(register);

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

    return (
        <nav>
            <ul
                className={classNames({
                    [className]: className,
                    ["flex flex-col"]: !className,
                })}
            >
                {nav_utils.map((nav) => (
                    <li key={nav.appName}>
                        <Link to={nav.appRoot}>{nav.appName}</Link>
                    </li>
                ))}
            </ul>

            <ul
                className={classNames({
                    [className]: className,
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
        </nav>
    );
};

export default Nav;
