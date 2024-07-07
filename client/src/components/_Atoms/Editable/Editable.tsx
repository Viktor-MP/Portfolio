import React, { ChangeEvent, FC, useState } from "react";
import { editablePropsType } from "../../../types/editable_Types";
import Classes from "./Editable.module.scss";
import classNames from "classnames";

import { MdEdit } from "react-icons/md";

const Editable: FC<editablePropsType> = ({
    editableHeading,
}) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const [targetVal, setTargetVal] = useState<string>(editableHeading);

    const isTyping = (e: ChangeEvent<HTMLInputElement>) =>
        setTargetVal(e.target.value);
    const editableHandler = () => setIsEditable(!isEditable);
    console.log(isEditable);
    return (
      
            <div className={`${Classes["parentInput"]}`}>
                <input
                    onBlur={editableHandler}
                    onChange={isTyping}
                    value={targetVal}
                    disabled={!isEditable}
                    type="text"
                />
                <MdEdit onClick={editableHandler} />
              
            </div>
        
    );
};

export default Editable;
