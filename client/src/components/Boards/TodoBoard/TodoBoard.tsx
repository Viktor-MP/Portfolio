import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import Classes from "./Todo.module.scss";

import { useRegisterContext } from "src/contexts/registered_context";
import { setMode } from "src/reduxState/lightModeSlice";
import { RootState } from "src/reduxState/store";

import { todoWorkspace } from "../../../utils";
import { tablesTypes, todo_types } from "../../../types";

import { Editable } from "../../_Atoms/index";

import classNames from "classnames";
import { Heading } from "src/components/_Molecules";

const TodoBoard: FC<todo_types> = ({ className }) => {
    const { register } = useRegisterContext();
    const mode = useSelector((state: RootState) => state.lightMode.lightMode);
    const [tables, setTables] = useState<tablesTypes[]>(todoWorkspace.tables);
    console.log(typeof className);
    const dispatch = useDispatch();
    console.log(todoWorkspace);
    useEffect(() => {
        const localModeState = localStorage.getItem("isLightMode");
        if (localModeState === "true") dispatch(setMode(true));
        else if (localModeState === "false") dispatch(setMode(false));
    }, []);

    return (
        <section
            className={`${classNames({
                [`${className}`]: className,
                [Classes["workspace"]]: !className,
            })}`}
        >
            <Heading userName={register.userName} mode={mode}>
                <Editable editableHeading={todoWorkspace.todoName} />
            </Heading>

            <div className={`${Classes["board"]}`}>
                <div className={`${Classes["container"]}`}>
                    <h2>Boards</h2>
                    <ul className={`${Classes["tables"]}`}>
                        {tables.map((table) => {
                            return (
                                <li key={table.id} className={Classes["table"]}>
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
