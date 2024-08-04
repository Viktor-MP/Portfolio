import { useSelector } from "react-redux";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

import Classes from "./Todo.module.scss";

import { useRegisterContext } from "src/contexts/registered_context";
import { RootState } from "src/reduxState/_store";

import { todoWorkspace } from "../../../utils";
import { todo_types } from "../../../types";

import { Editable } from "../../_Atoms/index";

import classNames from "classnames";
import { Heading, Tasks } from "src/components/_Molecules";
import { todoWorkspaceType } from "src/types/todo_Types";

import BoardCreator from "src/components/_Molecules/BoardCreator/BoardCreator";

const TodoBoard: FC<todo_types> = ({ className }) => {
    const { register } = useRegisterContext();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mode = useSelector((state: RootState) => state.lightMode.lightMode);

    const localTodoBoard = JSON.parse(
        localStorage.getItem("todoBoard") || JSON.stringify(todoWorkspace)
    );

    const [workspace, setWorkspace] =
        useState<todoWorkspaceType>(localTodoBoard);

    useEffect(() => {
        // console.log(workspace);
        const todoBoard = JSON.stringify(workspace);
        localStorage.setItem("todoBoard", todoBoard);
    }, [workspace]);

    const boardContent_handler = (e: ChangeEvent<HTMLInputElement>) => {
        const tar = e.target;
        const newValue = tar.value;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (tar.name !== "todoName") {
                localTodoBoard[`${tar.name}`][+tar.id - 1].tableName = newValue;
            } else {
                localTodoBoard[`${tar.name}`] = newValue;
            }

            setWorkspace({ ...localTodoBoard });
        }, 500);
    };

    return (
        <section
            className={`${classNames({
                [`${className}`]: className,
                [Classes["workspace"]]: !className,
                [Classes["todo_light"]]: mode,
                [Classes["todo_dark"]]: !mode,
            })}`}
        >
            <Heading userName={register.userName} mode={mode}>
                <Editable
                    change={boardContent_handler}
                    editablePath={workspace.todoName}
                    name={"todoName"}
                    id={0}
                />
            </Heading>

            <div className={`${Classes["board"]}`}>
                <div className={`${Classes["container"]}`}>
                    <h3>Boards</h3>
                    <div className={`${Classes["tables"]}`}>
                        {workspace.tables.map((table) => {
                            // console.log(table);
                            return (
                                <Tasks
                                    table={table}
                                    name="tables"
                                    key={table.id}
                                    className={Classes["table"]}
                                    change={boardContent_handler}
                                />
                            );
                        })}

                        <BoardCreator />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TodoBoard;
