import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { todoWorkspaceType } from "src/types/todo_Types";
import { todoWorkspace } from "src/utils";

export interface todoBoardType {
    todoBoard: todoWorkspaceType;
}

const initialState: todoBoardType = {
    todoBoard: todoWorkspace,
};

const todoModelSlice = createSlice({
    name: "todoBoard",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<todoWorkspaceType>) => {
            state.todoBoard = action.payload;
        },
    },
});
export const { setBoard } = todoModelSlice.actions;

export default todoModelSlice.reducer;
