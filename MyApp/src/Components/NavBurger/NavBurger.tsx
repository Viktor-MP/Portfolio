import { useState, useRef } from "react";
import "./NavBurger.scss";

const NavBurger = () => {
    const [toggle, setToggle] = useState<boolean>(true);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const toggleBurger = () => {
        console.log("click");
        setTimeout(() => {
            const toggleClass = (toggle && "open") || "";
            if (buttonRef.current) {
                buttonRef.current.className = toggleClass;
            }
            setToggle(!toggle);
        }, 100);
    };

    return (
        <button
            className=""
            onClick={toggleBurger}
            ref={buttonRef}
            id="nav-icon2"
            onBlur={toggleBurger}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default NavBurger;
