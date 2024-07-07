import React, { FC, useEffect, useState } from "react";
import Heading from "../ChildrenComponents/Heading/Heading";
import Classes from "./Todo.module.scss";

import { todo_types } from "./todo_Types";
import { useRegisterContext } from "src/contexts/registered_context";
import { RootState } from "src/reduxState/store";
import { useDispatch, useSelector } from "react-redux";
import EditableComponent from "../ChildrenComponents/Editable/Editable";
import { tablesTypes, todoWorkspace } from "./todo_utils";
import classNames from "classnames";

const TodoBoard: FC<todo_types> = ({ className }) => {
    const { register } = useRegisterContext();
    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const [tables, setTables] = useState<tablesTypes[]>(todoWorkspace.tables);
    console.log(todoWorkspace);

    return (
        <section
            className={`${classNames({
                [`${className}`]: className,
                [Classes["workspace"]]: !className,
            })}`}
        >
            <EditableComponent
                editableHeading={todoWorkspace.todoName}
                userName={register.userName}
                mode={mode}
            />

            <div className={`${Classes["board"]}`}>
                <div className={`${Classes["container"]}`}>
                    <h2>Boards</h2>
                    <ul className={`${Classes["tables"]}`}>
                        {tables.map((table) => {
                            return (
                                <li
                                    key={table.id}
                                    className={Classes["table"]}
                                >
                                    {table.tableName}
                                </li>
                            );
                        })} 
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default TodoBoard;
