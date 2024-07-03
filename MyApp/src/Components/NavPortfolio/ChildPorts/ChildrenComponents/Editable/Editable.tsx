/* eslint-disable jsx-a11y/no-autofocus */
import React, { ChangeEvent, FC, useState } from "react";
import { editablePropsType } from "./editable_types";
import classNames from "classnames";

const EditableComponent: FC<editablePropsType> = ({
    editableHeading,
    className,
}) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const [targetVal, setTargetVal] = useState<string>(editableHeading);

    const isTyping = (e: ChangeEvent<HTMLInputElement>) =>
        setTargetVal(e.target.value);
    const editableHandler = () => setIsEditable(!isEditable);

    console.log(targetVal);
    return (
        <div className={`${className ?? className} flex px-4 py-2 bg-yellow `}>
            <span>My</span>{" "}
            <input
                className="bg-yellow"
                autoFocus
                onClick={editableHandler}
                onBlur={editableHandler}
                onChange={isTyping}
                type="text"
                value={targetVal}
                readOnly={!isEditable}
            />
        </div>
    );
};

export default EditableComponent;
