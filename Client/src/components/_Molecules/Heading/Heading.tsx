import { FC } from "react";

import { headingPropsTypes } from "src/types/heading_Types";
import Classes from "./Heading.module.scss";
import classNames from "classnames";

const Heading: FC<headingPropsTypes> = ({
    mode,
    userName,
    children,
    className,
}) => {
    // const [content, setContent] = useState("Todo board");
    // const editableRef = useRef(null);
    // console.log(editableRef.current);

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
