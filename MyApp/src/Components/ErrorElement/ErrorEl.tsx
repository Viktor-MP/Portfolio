import React from "react";
import { Link } from "react-router-dom";
import Classes from "../NavPortfolio/Main.module.scss";

const ErrorEl = () => {
    let winHref = window.location.pathname;
    winHref = winHref.slice(0, winHref.lastIndexOf("/"));
    console.log(window.location);
    console.log(winHref);
    return (
        <div
            className={`${Classes["flex"]} ${Classes["flexCen"]} ${Classes["col"]} ${Classes["hei"]}`}
        >
            <h2> Can&apos;t fined the page </h2>
            <p>Please follow the instruction</p>
            <p>
                click hear
                <Link to={winHref}> go back </Link>
                to return
            </p>
        </div>
    );
};

export default ErrorEl;
