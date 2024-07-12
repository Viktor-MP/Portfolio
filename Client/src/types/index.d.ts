import {
    formContentValidate,
    formContentType,
    registerTypes,
} from "../validation";
import { todo_types, tablesTypes } from "./todo_Types";
import { editablePropsType } from "./editable_Types";
import { headingPropsTypes } from "./heading_Types";
import { input_Types } from "./register_Types";
import { mainPropsType } from "./main_Types";
import { NavCompTypes } from "./nav_Types";
import { taskPropsType } from "./tasks_Types";

declare module "*.module.scss" {
    const content: Record<string, string>;
    export default content;
}

export type {
    formContentValidate,
    editablePropsType,
    headingPropsTypes,
    formContentType,
    registerTypes,
    mainPropsType,
    taskPropsType,
    NavCompTypes,
    tablesTypes,
    input_Types,
    todo_types,
};
