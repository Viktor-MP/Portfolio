/* eslint-disable jsx-a11y/no-autofocus */
import React, { Children, FC, useEffect, useState } from "react";

const EditableComponent: FC  = () => {
    const [content, setContent] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    const editableHandler = () => {
        console.log(isEditable);
        setIsEditable(true);
    };

    console.log(isEditable);
    return (
        <div>
            <input
                autoFocus
                onClick={editableHandler}
                type="text"
                readOnly={!isEditable}
            />
            
        </div>
    );
};

export default EditableComponent;
