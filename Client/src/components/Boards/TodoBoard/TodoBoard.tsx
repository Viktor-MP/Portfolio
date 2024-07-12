import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

import GClass from "../../Global.module.scss";
import Classes from "./Todo.module.scss";
import { bgCImages } from "src/utils/todo_utils";

import { useRegisterContext } from "src/contexts/registered_context";
import { RootState } from "src/reduxState/_store";

import { todoWorkspace } from "../../../utils";
import { todo_types } from "../../../types";

import { Editable } from "../../_Atoms/index";

import classNames from "classnames";
import { Heading, Tasks } from "src/components/_Molecules";
import { todoWorkspaceType } from "src/types/todo_Types";

import { BsPlusSquare } from "react-icons/bs";
import { Input } from "postcss";

const TodoBoard: FC<todo_types> = ({ className }) => {
    const { register } = useRegisterContext();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mode = useSelector((state: RootState) => state.lightMode.lightMode);

    const [isNewTable, setIsNewTable] = useState<boolean>(false);

    const localTodoBoard = JSON.parse(
        localStorage.getItem("todoBoard") || JSON.stringify(todoWorkspace)
    );

    const [workspace, setWorkspace] =
        useState<todoWorkspaceType>(localTodoBoard);

    const randomBgImage = {
        backgroundImage: `url(${
            bgCImages[Math.floor(Math.random() * (bgCImages.length - 1))]
        })`,
    };

    useEffect(() => {
        console.log(workspace);
        const todoBoard = JSON.stringify(workspace);
        localStorage.setItem("todoBoard", todoBoard);
    }, [workspace]);

    const boardContent_handler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (e.target.name !== "todoName") {
                localTodoBoard[`${e.target.name}`][+e.target.id].tableName =
                    newValue;
            } else {
                localTodoBoard[`${e.target.name}`] = newValue;
            }

            setWorkspace({ ...localTodoBoard });
        }, 500);
    };

    console.log(
        Math.floor(Math.random() * (bgCImages.length - 1)),
        bgCImages.length
    );
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
                    <div
                        className={`${Classes["table"]} ${Classes["tableCreator"]} ${GClass["flex_cen"]}`}
                        style={randomBgImage}
                    >
                        {isNewTable ? <>
                        <p>Create new table</p>
                        <BsPlusSquare />
                        
                        </>: <div></div>}
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TodoBoard;
