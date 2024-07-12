import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./lightModeSlice";
import boardReducer from "./todoBoardSlice";

export const store = configureStore({
    reducer: {
        lightMode: modeReducer,
        todoBoard: boardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
