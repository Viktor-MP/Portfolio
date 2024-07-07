import React, { useState, useRef, FC, Children } from "react";
import Edit from "../../_Atoms/Editable/Editable";
import { headingPropsTypes } from "src/types/heading_Types";
import Classes from "./Heading.module.scss"
import classNames from "classnames";

const Heading: FC<headingPropsTypes> = ({
    children,
    mode,
    className,
    userName,
}) => {
    const [content, setcontent] = useState("Todo board");
    const editableRef = useRef(null);
    console.log(editableRef.current);

    return (
        <header
            className={`${classNames({
                [`${className}`]: className,
                [Classes["header_light"]]: mode,
                [Classes["header_dark"]]: !mode,
            })} `}
        >
            <h2>{userName}</h2>
            {children}
        </header>
    );
};

export default Heading;
