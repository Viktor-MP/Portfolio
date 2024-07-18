import { ChangeEvent } from "react";
import { tablesTypes } from "./todo_Types";

export type taskPropsType = {
    name: string;
    className: string;
    table: tablesTypes;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
};
