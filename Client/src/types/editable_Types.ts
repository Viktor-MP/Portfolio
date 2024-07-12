import { ChangeEvent } from "react";


export type editablePropsType = {
    id: number;
    name: string;
    userName?: string;
    className?: string;
    editablePath: string;
    change: (e: ChangeEvent<HTMLInputElement>) => void;
};


