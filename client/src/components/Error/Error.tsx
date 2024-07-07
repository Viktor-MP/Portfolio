import { RootState } from "src/reduxState/store";
import { useSelector } from "react-redux";

import Classes from "./Error.module.scss";
import GClass from "../Global.module.scss";
import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "src/reduxState/lightModeSlice";

const ErrorEl = () => {
    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const dispatch = useDispatch();
    
    console.log(mode);

    useEffect(() => {
        const localModeState = localStorage.getItem("isLightMode");
        if (localModeState === "true") dispatch(setMode(true));
        else if (localModeState === "false") dispatch(setMode(false));
    }, []);

    return (
        <section
            className={` ${classNames({
                [Classes["edit_light"]]: mode,
                [Classes["edit_dark"]]: !mode,
            })}  ${
                GClass["flex_col_cen"]
            } text-center  text-2xl  gap-4 h-[100dvh]`}
        >
            <h2 className=" text-3xl"> Can&apos;t fined the page </h2>
            <p>
                Please click
                <button
                    className={`${GClass["link_to"]}`}
                    onClick={() => history.back()}
                >
                    {" "}
                    hear{" "}
                </button>
                to return
            </p>
        </section>
    );
};

export default ErrorEl;
