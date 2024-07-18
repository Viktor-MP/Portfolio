/* eslint-disable react-hooks/exhaustive-deps */

import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// styles
import GClass from "../Global.module.scss";
import Styles from "../Style.module.scss";
import classNames from "classnames";

import { useRegisterContext } from "src/contexts/registered_context";
import { checkAuth } from "src/services/AuthService";

// redux
import { providerPath as path } from "../../routingPath";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reduxState/_store";

import { setMode } from "src/reduxState/lightModeSlice";      

const Intro = () => {
    const { setRegister } = useRegisterContext();
    const navigate = useNavigate();

    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // const modeChanger = () => {
    //     console.log(!mode);
    //     dispatch(setMode(!mode));
    //     localStorage.setItem("isLightMode", (!mode).toString());
    // };

    useEffect(() => {
        const localModeState = localStorage.getItem("isLightMode");
        if (localModeState === "true") dispatch(setMode(true));
        else if (localModeState === "false") dispatch(setMode(false));

        const fetchData = async () => {
            try {
                if (localStorage.getItem("token")) {
                    await checkAuth().then((res) => {
                        if (res?.status === 200) {
                            setRegister({
                                userName: res.data.user.userName,
                                isAuth: res.data.user.isActivated,
                            });
                        }
                    });
                }
            } catch (error) {
                if (axios.isAxiosError(error) && !error.response) {
                    setError(
                        "Network error, please check your internet connection or try again later."
                    );
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const changePage = (
        event: { preventDefault: () => void },
        path: string
    ) => {
        event.preventDefault();

        startTransition(() => {
            navigate(path);
        });
    };

    return (
        <main
            className={` min-h-dvh ${GClass["flex_col_cen"]} gap-10
             ${classNames({
                 [Styles["comp_light"]]: mode,
                 [Styles["comp_dark"]]: !mode,
             })}`}
        >
            <div
                className={` width-1/2 text-center ${GClass["flex_col_cen"]} gap-6`}
            >
                <h1 className={`text-4xl ${Styles["heading_anim"]}`}>
                    Welcome to my Portfolio
                </h1>
                <p>I proudly present you my portfolio</p>
                <p>
                    You can{" "}
                    <span
                        aria-hidden="true"
                        onClick={(e) => changePage(e, path.signUp())}
                        className={`${GClass["link_to"]}`}
                    >
                        Sign up
                    </span>{" "}
                    in that case you&apos;ll have more options to use
                </p>

                <p>
                    If not continue as a{" "}
                    <span
                        aria-hidden="true"
                        onClick={(e) => changePage(e, path.guest())}
                        className={`${GClass["link_to"]}`}
                    >
                        Guest
                    </span>{" "}
                </p>
                <div className="flex justify-evenly w-full ">
                    <span
                        aria-hidden="true"
                        onClick={(e) => changePage(e, path.signIn())}
                        className={`${Styles["signRef"]}`}
                    >
                        Sign in
                    </span>{" "}
                    <span
                        aria-hidden="true"
                        onClick={(e) => changePage(e, path.signUp())}
                        className={`${Styles["signRef"]}`}
                    >
                        Sign up
                    </span>
                </div>
                {/* <button onClick={modeChanger}>change mode</button> */}
            </div>
        </main>
    );
};

export default Intro;
