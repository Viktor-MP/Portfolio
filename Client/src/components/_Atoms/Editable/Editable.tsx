import React, { ChangeEvent, FC, useState } from "react";
import { editablePropsType } from "../../../types/editable_Types";
import Classes from "./Editable.module.scss";

import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "src/reduxState/_store";

const Editable: FC<editablePropsType> = ({ editablePath, change, name, id }) => {
    const board = useSelector((state: RootState) => state.todoBoard.todoBoard);
    // console.log(board, editablePath);
    const [targetVal, setTargetVal] = useState<string>(editablePath);

    const isTyping = (e: ChangeEvent<HTMLInputElement>) =>
        setTargetVal(e.target.value);
    // console.log(board);

    return (
        <div className={`${Classes["parentInput"]} `}>
            
            <input onChange={(e) => {
                isTyping(e)
                console.log(e.target.name)
                return change(e)
            }} value={targetVal} name={name} id={id.toString()} type="text" />
            <MdEdit />
        </div>
    );
};

export default Editable;
