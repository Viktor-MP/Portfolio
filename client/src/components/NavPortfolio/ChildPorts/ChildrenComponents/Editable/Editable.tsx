import React, { ChangeEvent, FC, useState } from "react";
import { editablePropsType } from "./editable_types";
import Classes from "./Editable.module.scss";
import classNames from "classnames";

import { MdEdit } from "react-icons/md";

const EditableComponent: FC<editablePropsType> = ({
    editableHeading,
    userName,
    className,
    children,
    mode,
}) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const [targetVal, setTargetVal] = useState<string>(editableHeading);

    const isTyping = (e: ChangeEvent<HTMLInputElement>) =>
        setTargetVal(e.target.value);
    const editableHandler = () => setIsEditable(!isEditable);
    console.log(isEditable);
    return (
        <div
            className={`${classNames({
                [`${className}`]: className,
                [`${Classes["editable"]}`]: !className,
                [Classes["todo_light"]]: mode,
                [Classes["todo_dark"]]: !mode,
            })} `}
        >
            <h2>{userName}</h2>
            <div className={`${Classes["parentInput"]}`}>
                <input
                    onBlur={editableHandler}
                    onChange={isTyping}
                    value={targetVal}
                    disabled={!isEditable}
                    type="text"
                />
                <MdEdit onClick={editableHandler} />
                {children}
            </div>
        </div>
    );
};

export default EditableComponent;
