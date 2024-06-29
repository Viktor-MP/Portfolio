import { Link, useNavigate } from "react-router-dom";
import ClassesComb from "../../globalClasses/globalClasses";
import Styles from "../../Styles.module.scss";
import { useEffect } from "react";
import { useRegisterContext } from "src/contexts/registered_context";
import { checkAuth } from "src/services/AuthService";

const Portfolio = () => {
    const { register, setRegister } = useRegisterContext();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            console.log("item");
            checkAuth().then((res) => {
                if (res?.status === 200) {
                    console.log(res);
                    setRegister({
                        userName: res.data.user.userName,
                        isAuth: res.data.user.isActivated,
                    });
                    navigate("/portfolio", { replace: true });
                }
            });
        }
    }, []);

    return (
        <main
            className={`bg-primary min-h-dvh ${ClassesComb["flex_col_cen"]} gap-6`}
        >
            <div className={` width-1/2 ${ClassesComb["flex_col_cen"]} gap-6`}>
                <h1 className={`text-4xl ${Styles["heading_anim"]}`}>
                    Welcome to my Portfolio
                </h1>
                <p>I proudly present you my portfolio</p>
                <p>
                    You can{" "}
                    <Link
                        className={`${ClassesComb["link_un_line"]} `}
                        to={"/portfolio/signUp"}
                    >
                        sign up
                    </Link>{" "}
                    in that case you&apos;ll have more options to use
                </p>

                <p>
                    If not continue as a{" "}
                    <Link
                        className={`${ClassesComb["link_un_line"]} `}
                        to={"/portfolio/guest"}
                    >
                        Guest
                    </Link>
                    {/* <BsArrow90DegRight className="arrow" /> */}
                </p>
                <div className="flex justify-evenly w-full ">
                    <Link
                        className={`${ClassesComb["link_btn"]} ${ClassesComb["trans_200"]}`}
                        to={"/portfolio/signIn"}
                    >
                        Sign in
                    </Link>
                    <Link
                        className={`${ClassesComb["link_btn"]} ${ClassesComb["trans_200"]}`}
                        to={"/portfolio/signUp"}
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Portfolio;
