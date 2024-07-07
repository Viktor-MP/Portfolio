import React from "react";
import { Link } from "react-router-dom";
import GClass from "../Global.module.scss";

const ErrorEl = () => {
    let winHref = window.location.pathname;
    winHref = winHref.slice(0, winHref.lastIndexOf("/"));
    console.log(window.location);
    console.log(winHref);
    return (
        <section
            className={`${GClass["flex_col_cen"]} text-center  text-2xl  gap-4 h-[100dvh]`}
        >
            <h2> Can&apos;t fined the page </h2>
            <p>Please follow the instruction</p>
            <p>
                click hear
                <Link to={winHref}> go back </Link>
                to return
            </p>
        </section>
    );
};

export default ErrorEl;
