/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";

// styles
import GClass from "../Global.module.scss";
import Styles from "../Style.module.scss";
import classNames from "classnames";

import { useLayoutEffect } from "react";
import { useRegisterContext } from "src/contexts/registered_context";
import { checkAuth, logout } from "src/services/AuthService";

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reduxState/_store";
import { providerPath as path } from "../../routingPath";

import { setMode } from "src/reduxState/lightModeSlice";

const Intro = () => {
    const { setRegister } = useRegisterContext();
    const navigate = useNavigate();

    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const dispatch = useDispatch();

    const modeChanger = () => {
        console.log(!mode);
        dispatch(setMode(!mode));
        localStorage.setItem("isLightMode", (!mode).toString());
    };

    useLayoutEffect(() => {
        const localModeState = localStorage.getItem("isLightMode");
        if (localModeState === "true") dispatch(setMode(true));
        else if (localModeState === "false") dispatch(setMode(false));

        if (localStorage.getItem("token")) {
            checkAuth().then((res) => {
                if (res?.status === 200) {
                    setRegister({
                        userName: res.data.user.userName,
                        isAuth: res.data.user.isActivated,
                    });
                    navigate(path.todoBoard(), { replace: true });
                }
            });
        }
    }, []);

    const logoutHandler = async () => {
        try {
            const userLogout = await logout();
            localStorage.removeItem("token");
            setRegister({
                userName: "guest",
                isAuth: false,
            });
        } catch (error) {
            console.log(error);
        }
    };
    console.log(mode);

    console.log(Styles["signRef"]);

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
                    <Link className={`${GClass["link_to"]}`} to={path.signUp()}>
                        sign up
                    </Link>{" "}
                    in that case you&apos;ll have more options to use
                </p>

                <p>
                    If not continue as a{" "}
                    <Link className={`${GClass["link_to"]}`} to={path.guest()}>
                        Guest
                    </Link>
                </p>
                <div className="flex justify-evenly w-full ">
                    <Link className={Styles["signRef"]} to={path.signIn()}>
                        Sign in
                    </Link>
                    <Link className={Styles["signRef"]} to={path.signUp()}>
                        Sign up
                    </Link>
                </div>
                <button onClick={modeChanger}>change mode</button>
            </div>
        </main>
    );
};

export default Intro;
