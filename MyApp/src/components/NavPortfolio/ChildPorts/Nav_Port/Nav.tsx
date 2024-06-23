import React, { FC } from "react";
import nav_utils from "../../../UtilsComp/nav/nav_utils";
import { Link } from "react-router-dom";
import Classes from "../../Main.module.scss";
import classNames from "classnames";

const Nav: FC<{ className?: string }> = ({ className = "" }) => {
    const navClasses = `
    ${Classes["flex"]}
    ${Classes["col"]} 
    ${Classes["alCen"]}
    `;

    const logout = () => {

    }


    return (
        <nav>
            <ul
                className={classNames({
                    [className]: className,
                    [navClasses]: !className,
                })}
            >
                {nav_utils.map((nav) => (
                    <li key={nav.appName}>
                        <Link to={nav.appRoot}>{nav.appName}</Link>
                    </li>
                ))}
            </ul>

            
            <button onClick={logout}>
                logout
            </button>
        </nav>
    );
};

export default Nav;
