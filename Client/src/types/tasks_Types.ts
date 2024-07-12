import { ChangeEvent } from "react";
import { tablesTypes } from "./todo_Types";

export type taskPropsType = {
    name: string;
    table: tablesTypes;
    className: string;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
};
